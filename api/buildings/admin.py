from copy import deepcopy
import os
from zipfile import BadZipFile

import tablib
from django.conf import settings
from django.contrib import admin, messages
from django.contrib.admin import display
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ngettext
from import_export import resources

from buildings import models
from buildings.models import ImageFile


class BuildingWorkPerformedInline(admin.TabularInline):
    model = models.BuildingWorkPerformedEvent
    extra = 1


class ImageInline(admin.TabularInline):
    model = models.ImageFile
    max_num = settings.ALLOWED_IMAGES_LIMIT
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


@admin.register(models.ImageFile)
class ImageAdmin(admin.ModelAdmin):
    list_display = ("image_name", "image_thumb", "status")

    actions = (
        "make_pending",
        "make_accepted",
        "make_rejected",
    )

    def make_pending(self, request, queryset):
        self._perform_status_change(request, queryset, "0")

    make_pending.short_description = _("Mark selected images as pending")

    def make_accepted(self, request, queryset):
        self._perform_status_change(request, queryset, "1")

    make_accepted.short_description = _("Mark selected images as accepted")

    def make_rejected(self, request, queryset):
        self._perform_status_change(request, queryset, "-1")

    make_rejected.short_description = _("Mark selected images as rejected")

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

    def _perform_status_change(self, request, queryset, status):
        updated = queryset.update(status=status)

        status_str = self.choice_to_string(status)
        message = ngettext(
            "{updated} image was successfully marked as {status}.",
            "{updated} images were successfully marked as {status}.",
            updated,
        ).format(updated=updated, status=status_str)

        self.message_user(request, message, messages.SUCCESS)


@admin.register(models.BuildingProximalUtilities, models.BuildingWorkPerformed)
class BuildingAttributes(admin.ModelAdmin):
    pass


@admin.register(models.Building)
class BuildingAdmin(admin.ModelAdmin):
    list_filter = ("status", "risk_category", "county", "locality")
    list_display = (
        "get_building_address",
        "risk_category",
        "examination_year",
        "certified_expert",
        "status",
        "general_id",
        "get_images",
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
                    "has_warning_panels",
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
    inlines = (BuildingWorkPerformedInline, ImageInline)

    @display(ordering="building__address", description=_("Address"))
    def get_building_address(self, obj):
        county = settings.COUNTIES_MAPPING[obj.county]
        return mark_safe("{} {} ({}, {})".format(obj.address, obj.street_number, obj.locality, county))

    @display(ordering="building__imagefile", description=_("Images"))
    def get_images(self, obj):
        """
        Iterate on images and produce proper html rendering
        """
        if obj.images.count() > 0 and len(ImageFile.approved.all()) > 0:
            image_html = '<a href={0}><img src="{0}" url width="50" height="50" /></a>'
            final_html = []
            for img in obj.images.all():
                final_html.append(image_html.format(os.path.join(settings.MEDIA_URL, str(img.image))))
            return mark_safe("".join(final_html))
        else:
            return _("No associated images")

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
        for status_choice in models.ImageFile.IMAGE_STATUS_CHOICES:
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


@admin.register(models.DataFile)
class DataFileAdmin(admin.ModelAdmin):
    actions = ("import_files",)
    list_display = ("name", "status")

    def import_files(self, request, query_set):
        for q in query_set:
            try:
                data = self._read_file_data(q)
                data = self._normalize_data_headers(data)
                building_res = BuildingResource()
                res = building_res.import_data(data, dry_run=False, raise_errors=True, collect_failed_rows=True)
                data_file = models.DataFile.objects.get(name=str(q))

                if res.has_errors() or res.has_validation_errors():
                    data_file.status = models.DataFile.FAILURE
                    row_errors = [
                        f"error#{error[0]}: {error[1][0].error} FAILED ON ROW DATA {error[1][0].row} "
                        f"||| TRACEBACK: {error[1][0].traceback}"
                        for error in res.row_errors()
                    ]
                    message_str = _(
                        "File with name '{file_name}' wasn't imported. Errors: {row_errors}".format(
                            file_name=str(q), row_errors=row_errors
                        )
                    )
                    message_level = messages.WARNING
                else:
                    data_file.status = models.DataFile.SUCCESS
                    message_str = _("File with name '{file_name}' was imported.".format(file_name=str(q)))
                    message_level = messages.SUCCESS
                data_file.save()
            except BadZipFile:
                self.save_file_as_failed(q)

                message_str = _(
                    "File with name '{file_name}' wasn't a proper data file. Accepted formats are: CSV, XLSX.".format(
                        file_name=str(q)
                    )
                )
                message_level = messages.ERROR
            except ValueError as e:
                self.save_file_as_failed(q)

                message_str = _(
                    "File with name '{file_name}' couldn't be imported. The error received was: `{error_args}`".format(
                        file_name=str(q), error_args=e.args[0]
                    )
                )
                message_level = messages.ERROR
            except Exception as e:
                self.save_file_as_failed(q)
                raise e

            self.message_user(request, message_str, message_level)

    @staticmethod
    def _normalize_data_headers(data):
        normalized_data = deepcopy(data)
        normalized_headers = [
            header.lower().replace(":", "").replace(".", "").strip().replace(" ", "_")
            for header in normalized_data.headers
        ]
        normalized_data.headers = normalized_headers

        return normalized_data

    @staticmethod
    def _read_file_data(q):
        file_name: str = q.file.file.name
        file_extension: str = file_name.split(".")[-1].lower()
        if file_extension == "xlsx":
            data = tablib.import_set(open(file_name, "rb").read(), format="xlsx")
        elif file_extension == "csv":
            data = tablib.import_set(open(file_name, "r").read(), format="csv")
        else:
            raise BadZipFile
        return data

    @staticmethod
    def save_file_as_failed(q):
        csv_file = models.DataFile.objects.get(name=str(q))
        csv_file.status = models.DataFile.FAILURE
        csv_file.save()

    import_files.short_description = "Import selected files"
