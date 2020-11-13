import logging

import tablib
from django.contrib import admin, messages

from . import models


@admin.register(models.Building)
class BuildingAdmin(admin.ModelAdmin):
    list_filter = ("status", "risk_category", "post_code")
    list_display = (
        "address",
        "risk_category",
        "examination_year",
        "certified_expert",
        "status",
        "general_id",
    )
    search_fields = ("address",)


@admin.register(models.CsvFile)
class CSVFileAdmin(admin.ModelAdmin):
    actions = ("import_files",)
    list_display = ("name", "status")

    def import_files(self, request, query_set):
        logger = logging.getLogger()
        logger.setLevel(logging.INFO)
        logger.addHandler(logging.StreamHandler())
        self.message_user(request, "Starting the import of the query sets.", messages.WARNING)
        logger.info("Starting the import of the query sets.")
        for q in query_set:
            self.message_user(request, "Working on file {}.".format(q.file.file.name), messages.WARNING)
            logger.info("Working on file {}.".format(q.file.file.name))

            self.message_user(request, "Reading file...", messages.WARNING)
            logger.info("Reading file...")
            data = tablib.import_set(
                open(q.file.file.name, "rb").read(), format="xlsx"
            )
            self.message_user(request, "File read successfully", messages.WARNING)
            logger.info("File read successfully")

            self.message_user(request, "Parsing the file header", messages.WARNING)
            logger.info("Parsing the file header")
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

            self.message_user(request, "Importing the file data...", messages.WARNING)
            logger.info("Importing the file data...")
            res = building_res.import_data(
                data, dry_run=False, raise_errors=True
            )
            self.message_user(request, "Transforming everything into objects", messages.WARNING)
            logger.info("Transforming everything into objects")
            csv_file = models.CsvFile.objects.get(name=q.__str__())
            self.message_user(request, "Evaluating file import", messages.WARNING)
            logger.info("Evaluating file import")

            if res.has_errors() or res.has_validation_errors():
                self.message_user(request, "FAILURE", messages.WARNING)
                logger.info("FAILURE")
                csv_file.status = models.CsvFile.UNSUCCESS
                message_str = "File with name {} wasn't imported.".format(
                    q.__str__()
                )
                message_level = messages.WARNING
            else:
                self.message_user(request, "SUCCESS", messages.WARNING)
                logger.info("SUCCESS")
                csv_file.status = models.CsvFile.SUCCESS
                message_str = "File with name {} was imported.".format(
                    q.__str__()
                )
                message_level = messages.SUCCESS

            self.message_user(request, "Sending message to user", messages.WARNING)
            logger.info("Sending message to user")
            self.message_user(request, message_str, message_level)
            self.message_user(request, "Save the file", messages.WARNING)
            logger.info("Save the file")
            csv_file.save()
            self.message_user(request, "Everything has finished", messages.WARNING)
            logger.info("Everything has finished")

    import_files.short_description = "Import selected files"
