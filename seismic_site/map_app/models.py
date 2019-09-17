from enum import Enum

from django.core.serializers.json import DjangoJSONEncoder
from django.db import models


class CsvFile(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField()

    def __str__(self):
        return self.name


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
    clasa_categorie = models.CharField(max_length=5)
    nr_pmb = models.IntegerField()
    lat = models.FloatField()
    long = models.FloatField()
    loc = models.CharField(max_length=60)
    adresa = models.CharField(max_length=250)
    nr_postal = models.CharField(max_length=8)
    sector = models.CharField(max_length=20, choices=[(tag, tag.value) for tag in SectorChoice])
    nr_sector = models.IntegerField(choices=[(i, i) for i in range(1, 7)])
    an_construire = models.IntegerField(default=-1)
    regim_inaltime = models.CharField(max_length=50)
    nr_apart = models.IntegerField()
    arie_desfasurata = models.FloatField()
    an_expertiza = models.IntegerField(default=-1)
    expert_atestat = models.CharField(max_length=100)
    obs = models.CharField(max_length=1000)
    nr_cadastral = models.IntegerField()
    nr_carte_funciara = models.CharField(max_length=50)
    actualizare_pmb = models.DateField()
    editare_admin = models.DateField()

    def __str__(self):
        return self.adresa


class BuildingEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Building):
            return str(obj)
        return super().default(obj)
