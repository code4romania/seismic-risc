import tablib
from django.contrib import admin, messages

from . import models


@admin.register(models.Building)
class BuildingAdmin(admin.ModelAdmin):
    list_filter = ['status', 'clasa_categorie', 'nr_postal']
    list_display = ['adresa', 'clasa_categorie', 'an_expertiza', 'expert_atestat', 'status']
    search_fields = ['adresa']


@admin.register(models.CsvFile)
class CSVFileAdmin(admin.ModelAdmin):
    actions = ['import_files']
    list_display = ['name', 'status']

    def import_files(self, request, query_set):
        for q in query_set:
            data = tablib.import_set(open(q.file.file.name, 'rb').read())
            changed_headers = []
            for header in data.headers:
                changed_headers.append(header.lower().replace(':', '').replace('.', '').strip().replace(' ', '_'))
            data.headers = changed_headers
            building_res = models.BuildingResource()
            res = building_res.import_data(data, False, False)
            csv_file = models.CsvFile.objects.get(name=q.__str__())
            if res.has_errors() or res.has_validation_errors():
                csv_file.status = models.CsvFile.UNSUCCESS
            else:
                csv_file.status = models.CsvFile.SUCCESS
            self.message_user(request, "File with name {} {} imported.".format(q.__str__(),
                                                                               "was" if csv_file.status == models.CsvFile.SUCCESS
                                                                               else "wasn't"),
                              messages.WARNING if csv_file.status == models.CsvFile.UNSUCCESS else messages.SUCCESS)
            csv_file.save()

    import_files.short_description = "Import selected files"
