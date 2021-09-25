from zipfile import BadZipFile

import tablib
from django.conf import settings
from django.contrib import admin, messages
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ngettext
from import_export import resources

from buildings import models


class BuildingWorkPerformedInline(admin.TabularInline):
    model = models.BuildingWorkPerformedEvent
    extra = 1


@admin.register(models.Statistic)
class StatisticAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        base_add_permission = super(StatisticAdmin, self).has_add_permission(request)
        if base_add_permission:
            has_entry = models.Statistic.objects.count() != 0
            if not has_entry:
                return True
        return False


@admin.register(models.BuildingProximalUtilities, models.BuildingWorkPerformed)
class BuildingAttributes(admin.ModelAdmin):
    pass


@admin.register(models.Building)
class BuildingAdmin(admin.ModelAdmin):
    list_filter = ("status", "risk_category", "county", "locality")
    list_display = (
        "address",
        "risk_category",
        "examination_year",
        "certified_expert",
        "status",
        "general_id",
    )
    search_fields = ("address",)
    actions = (
        "make_pending",
        "make_accepted",
        "make_rejected",
    )
    fieldsets = (
        (_("Operational Data"), {"fields": ("parent_id", "status")}),
        (_("Seismic Data"), {"fields": ("risk_category", "height_regime")}),
        (_("Geo Data"), {"fields": ("street_number", "address", "county", "locality", "lat", "lng")}),
        (
            _("General Data"),
            {
                "fields": (
                    "is_still_present",
                    "consolidation_status",
                    "apartment_count",
                    "permanently_occupied_apartment_count",
                    "residents_count",
                    "owners_count",
                    "public_apartment_count",
                    "public_owners",
                    "rented_apartment_count",
                )
            },
        ),
        (
            _("Building Functioning"),
            {
                "fields": (
                    "has_owners_association",
                    "apartments_with_6_months_debt",
                    "disconnected_utilities",
                    "broken_utilities",
                )
            },
        ),
        (
            _("Structure and Occupancy Type"),
            {
                "fields": (
                    "office_count",
                    "commercial_space_count",
                    "self_owned_commercial_space_count",
                    "proximal_utilities",
                    "proximal_utilities_description",
                )
            },
        ),
        (
            _("Other info"),
            {
                "fields": (
                    "registration_number",
                    "examination_year",
                    "certified_expert",
                    "observations",
                    "year_built",
                    "surface",
                    "cadastre_number",
                    "land_registry_number",
                    "administration_update",
                    "admin_update",
                    "created_on",
                )
            },
        ),
    )
    inlines = (BuildingWorkPerformedInline,)

    def make_pending(self, request, queryset):
        self._perform_status_change(request, queryset, "0")

    make_pending.short_description = _("Mark selected buildings as pending")

    def make_accepted(self, request, queryset):
        self._perform_status_change(request, queryset, "1")

    make_accepted.short_description = _("Mark selected buildings as accepted")

    def make_rejected(self, request, queryset):
        self._perform_status_change(request, queryset, "-1")

    make_rejected.short_description = _("Mark selected buildings as rejected")

    def _perform_status_change(self, request, queryset, status):
        updated = queryset.update(status=status)

        status_str = self.choice_to_string(status)
        message = ngettext(
            "{updated} building was successfully marked as {status}.",
            "{updated} buildings were successfully marked as {status}.",
            updated,
        ).format(updated=updated, status=status_str)

        self.message_user(request, message, messages.SUCCESS)

    class Media:
        """
        If maps are enabled then we add the JS and CSS for either
        Google JS Maps API or the Mapbox APIs (including Geocoding).
        """

        library_css = "https://js.api.here.com/v3/3.1/mapsjs-ui.css"

        library_js = (
            "https://js.api.here.com/v3/3.1/mapsjs-core.js",
            "https://js.api.here.com/v3/3.1/mapsjs-service.js",
            "https://js.api.here.com/v3/3.1/mapsjs-ui.js",
            "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
            "js/admin/here_map.js",
        )

        css = {"all": ("css/admin/location_picker.css", library_css)}
        js = library_js

    def add_view(self, request, form_url="", extra_context=None):
        """
        Add the HERE_MAPS setting to context.
        """
        extra = extra_context or {}
        extra["HERE_MAPS"] = settings.HERE_MAPS
        return super(BuildingAdmin, self).add_view(request, form_url, extra_context=extra)

    def change_view(self, request, object_id, form_url="", extra_context=None):
        """
        Add the HERE_MAPS setting to context.
        """
        extra = extra_context or {}
        extra["HERE_MAPS"] = settings.HERE_MAPS
        return super(BuildingAdmin, self).change_view(request, object_id, form_url, extra_context=extra)

    def changelist_view(self, request, extra_context=None):
        """
        Add the HERE_MAPS setting to the change list view context.
        """
        extra = extra_context or {}
        extra["HERE_MAPS"] = settings.HERE_MAPS
        return super(BuildingAdmin, self).changelist_view(request, extra_context=extra)

    @staticmethod
    def choice_to_string(status):
        status = int(status)
        for status_choice in models.Building.BUILDING_STATUS_CHOICES:
            if status_choice[0] == status:
                status_str = status_choice[1]
                break
        else:
            status_str = ""
        return status_str


class BuildingResource(resources.ModelResource):
    class Meta:
        DATE_FORMAT = {"format": "%d.%m.%Y"}

        model = models.Building
        exclude = ("id",)
        import_id_fields = ("general_id",)

        widgets = {
            "administration_update": DATE_FORMAT,
            "admin_update": DATE_FORMAT,
        }

        verbose_name = _("building resource")
        verbose_name_plural = _("building resources")


@admin.register(models.CsvFile)
class CSVFileAdmin(admin.ModelAdmin):
    actions = ("import_files",)
    list_display = ("name", "status")

    def import_files(self, request, query_set):
        for q in query_set:
            try:
                data = tablib.import_set(open(q.file.file.name, "rb").read(), format="xlsx")
                changed_headers = []
                for header in data.headers:
                    changed_headers.append(header.lower().replace(":", "").replace(".", "").strip().replace(" ", "_"))
                data.headers = changed_headers
                building_res = BuildingResource()
                res = building_res.import_data(data, dry_run=False, raise_errors=False, collect_failed_rows=True)
                csv_file = models.CsvFile.objects.get(name=q.__str__())

                if res.has_errors() or res.has_validation_errors():
                    csv_file.status = models.CsvFile.FAILURE
                    row_errors = [
                        f"error#{error[0]}: {error[1][0].error} FAILED ON ROW DATA {error[1][0].row} "
                        f"||| TRACEBACK: {error[1][0].traceback}"
                        for error in res.row_errors()
                    ]
                    message_str = _(
                        "File with name '{file_name}' wasn't imported. Errors: {row_errors}".format(
                            file_name=q.__str__(), row_errors=row_errors
                        )
                    )
                    message_level = messages.WARNING
                else:
                    csv_file.status = models.CsvFile.SUCCESS
                    message_str = _("File with name '{file_name}' was imported.".format(file_name=q.__str__()))
                    message_level = messages.SUCCESS
                csv_file.save()
            except BadZipFile:
                self.save_file_as_failed(q)

                message_str = _("File with name '{file_name}' wasn't an XLSX.".format(file_name=q.__str__()))
                message_level = messages.ERROR
            except ValueError as e:
                self.save_file_as_failed(q)

                message_str = _(
                    "File with name '{file_name}' couldn't be imported. The error received was: `{error_args}`".format(
                        file_name=q.__str__(), error_args=e.args[0]
                    )
                )
                message_level = messages.ERROR
            except Exception as e:
                self.save_file_as_failed(q)
                raise e

            self.message_user(request, message_str, message_level)

    @staticmethod
    def save_file_as_failed(q):
        csv_file = models.CsvFile.objects.get(name=q.__str__())
        csv_file.status = models.CsvFile.FAILURE
        csv_file.save()

    import_files.short_description = "Import selected files"
