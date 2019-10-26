from enum import Enum

from django.db import models
from import_export import resources


class SectorChoice(Enum):
    s1 = 'Sector 1'
    s2 = 'Sector 2'
    s3 = 'Sector 3'
    s4 = 'Sector 4'
    s5 = 'Sector 5'
    s6 = 'Sector 6'


BUILDING_STATUS_CHOICES = [
    (0, 'Alege'),
    (1, 'Acceptat'),
    (-1, 'Respins'),
]


class SeismicCategoryChoice(Enum):
    pass
    # TODO Implement this and replace in model


class Building(models.Model):
    id_general = models.AutoField(primary_key=True)
    clasa_categorie = models.CharField(max_length=50, db_index=True)
    nr_pmb = models.IntegerField(null=True)
    lat = models.FloatField(null=True)
    long = models.FloatField(null=True)
    loc = models.CharField(max_length=60)
    adresa = models.CharField(max_length=250, null=True)
    nr_postal = models.CharField(max_length=250)
    sector = models.CharField(max_length=20)
    nr_sector = models.IntegerField(null=True)
    an_construire = models.IntegerField(null=True)
    regim_inaltime = models.CharField(max_length=50)
    nr_apart = models.IntegerField(null=True)
    arie_desfasurata = models.FloatField(null=True)
    an_expertiza = models.IntegerField(null=True)
    expert_atestat = models.CharField(max_length=100)
    obs = models.CharField(max_length=1000)
    numar_cadastral = models.IntegerField(null=True)
    nr_carte_funciara = models.CharField(max_length=50)
    actualizare_pmb = models.DateField(null=True, blank=True)
    editare_admin = models.DateField(null=True, blank=True)

    status = models.SmallIntegerField(
        default=0, choices=BUILDING_STATUS_CHOICES, db_index=True)

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


