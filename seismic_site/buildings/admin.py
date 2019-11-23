import tablib
from django.contrib import admin, messages

from . import models


@admin.register(models.Building)
class BuildingAdmin(admin.ModelAdmin):
    list_filter = ["status", "risk_category", "post_code"]
    list_display = [
        "address",
        "risk_category",
        "examination_year",
        "certified_expert",
        "status",
    ]
    search_fields = ["address"]


@admin.register(models.CsvFile)
class CSVFileAdmin(admin.ModelAdmin):
    actions = ["import_files"]
    list_display = ["name", "status"]

    def import_files(self, request, query_set):
        for q in query_set:
            data = tablib.import_set(
                open(q.file.file.name, "rb").read(), format="xlsx"
            )
            changed_headers = []
            for header in data.headers:
                changed_headers.append(
                    header.lower()
                    .replace(":", "")
                    .replace(".", "")
                    .strip()
                    .replace(" ", "_")
                )
            data.headers = changed_headers
            building_res = models.BuildingResource()
            res = building_res.import_data(
                data, dry_run=False, raise_errors=True
            )
            csv_file = models.CsvFile.objects.get(name=q.__str__())

            if res.has_errors() or res.has_validation_errors():
                csv_file.status = models.CsvFile.UNSUCCESS
                message_str = "File with name {} wasn't imported.".format(
                    q.__str__()
                )
                message_level = messages.WARNING
            else:
                csv_file.status = models.CsvFile.SUCCESS
                message_str = "File with name {} was imported.".format(
                    q.__str__()
                )
                message_level = messages.SUCCESS

            self.message_user(request, message_str, message_level)
            csv_file.save()

    import_files.short_description = "Import selected files"
