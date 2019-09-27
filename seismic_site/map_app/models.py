# Create your models here.

import tablib
from django.contrib import admin
from django.db import models
from import_export import resources


class Building(models.Model):
    # SECTOR_CHOICES = (
    #     ('s1', 'Sector 1'),
    #     ('s2', 'Sector 2'),
    #     ('s3', 'Sector 3'),
    #     ('s4', 'Sector 4')
    #     ('s5', 'Sector 5')
    # )
    id_general = models.AutoField(primary_key=True)
    clasa_categorie = models.CharField(max_length=5)
    nr_pmb = models.IntegerField()
    lat = models.FloatField()
    long = models.FloatField()
    loc = models.CharField(max_length=60)
    adresa = models.CharField(max_length=250, null=True)
    nr_postal = models.CharField(max_length=8)
    sector = models.CharField(max_length=20, default='sector')
    nr_sector = models.IntegerField()
    an_contruire = models.IntegerField
    regim_inaltime = models.CharField(max_length=50)
    nr_apart = models.IntegerField()
    arie_desfasurata = models.FloatField(null=True)
    an_expertiza = models.IntegerField()
    expert_atestat = models.CharField(max_length=100)
    obs = models.CharField(max_length=1000)
    numar_cadastral = models.IntegerField(null=True)
    nr_carte_funciara = models.CharField(max_length=50)
    actualizare_pmb = models.DateField(null=True)
    editare_admin = models.DateField(null=True)

    def __str__(self):
        return self.adresa


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

    name = models.CharField(max_length=255)
    file = models.FileField()
    status = models.SmallIntegerField(default=NOT_TRIED, editable=False)

    def __str__(self):
        return self.name


class CSVFileAdmin(admin.ModelAdmin):
    #todo add new status field on UI
    actions = ['import_files']

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
                self.message_user(request, "File with name {} isn't was imported.".format(q.__str__()))
                csv_file.status = CsvFile.UNSUCCESS
            else:
                csv_file.status = CsvFile.SUCCESS
            csv_file.save()

    import_files.short_description = "Import selected files"
