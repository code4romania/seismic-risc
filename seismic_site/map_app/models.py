from django.core.serializers.json import DjangoJSONEncoder
from django.contrib import admin, messages
from django.db import models

from import_export import resources
import tablib
from enum import Enum


class SectorChoice(Enum):
    s1 = 'Sector 1'
    s2 = 'Sector 2'
    s3 = 'Sector 3'
    s4 = 'Sector 4'
    s5 = 'Sector 5'
    s6 = 'Sector 6'


class SeismicCategoryChoice(Enum):
    pass
    # TODO Implement this and replace in model

class Building(models.Model):

    id_general = models.AutoField(primary_key=True)
    clasa_categorie = models.CharField(max_length=250)
    nr_pmb = models.IntegerField(null=True)
    lat = models.FloatField(null=True)
    long = models.FloatField(null=True)
    loc = models.CharField(max_length=60)
    adresa = models.CharField(max_length=250, null=True)
    nr_postal = models.CharField(max_length=250)
    sector = models.CharField(max_length=20, default='sector')
    nr_sector = models.IntegerField(null=True)
    an_contruire = models.IntegerField
    regim_inaltime = models.CharField(max_length=50)
    nr_apart = models.IntegerField(null=True)
    arie_desfasurata = models.FloatField(null=True)
    an_expertiza = models.IntegerField(null=True)
    expert_atestat = models.CharField(max_length=100)
    obs = models.CharField(max_length=1000)
    numar_cadastral = models.IntegerField(null=True)
    nr_carte_funciara = models.CharField(max_length=50)
    actualizare_pmb = models.DateField(null=True)
    editare_admin = models.DateField(null=True)

    def __str__(self):
        return self.adresa



class BuildingEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Building):
            return str(obj)
        return super().default(obj)

class BuildingResource(resources.ModelResource):
    class Meta:
        DATE_FORMAT = {'format': '%d.%m.%Y'}

        model = Building
        exclude = ('id',)
        import_id_fields = ('id_general',)

        widgets = {
            'actualizare_pmb' : DATE_FORMAT,
            'editare_admin' : DATE_FORMAT
        }


class CsvFile(models.Model):

    NOT_TRIED = 0
    SUCCESS = 1
    UNSUCCESS = -1

    STATUS_CHOICES = [
        (UNSUCCESS, 'Unsuccess'),
        (NOT_TRIED, 'Not tried'),
        (SUCCESS, 'Success'),
    ]

    name = models.CharField(max_length=255)
    file = models.FileField()
    status = models.SmallIntegerField(default=NOT_TRIED, editable=False, choices=STATUS_CHOICES)

    def __str__(self):
        return self.name


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
            building_res = BuildingResource()
            res = building_res.import_data(data, False, False)
            csv_file = CsvFile.objects.get(name=q.__str__())
            if res.has_errors() or res.has_validation_errors():
                csv_file.status = CsvFile.UNSUCCESS
            else:
                csv_file.status = CsvFile.SUCCESS
            self.message_user(request, "File with name {} {} imported.".format(q.__str__(),
                                                                               "was" if csv_file.status == CsvFile.SUCCESS
                                                                               else "wasn't"),
                              messages.WARNING if csv_file.status == CsvFile.UNSUCCESS else messages.SUCCESS)
            csv_file.save()

    import_files.short_description = "Import selected files"
