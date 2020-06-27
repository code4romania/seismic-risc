from enum import Enum

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from import_export import resources


class SectorChoice(Enum):
    s1 = _("Sector 1")
    s2 = _("Sector 2")
    s3 = _("Sector 3")
    s4 = _("Sector 4")
    s5 = _("Sector 5")
    s6 = _("Sector 6")


BUILDING_STATUS_CHOICES = [
    (0, _("Choose")),
    (1, _("Accepted")),
    (-1, _("Rejected")),
]


class SeismicCategoryChoice(Enum):
    pass
    # TODO Implement this and replace in model


class Building(models.Model):
    general_id = models.AutoField(_("general id"), primary_key=True)

    risk_category = models.CharField(
        _("risk category"), max_length=50, db_index=True
    )
    registration_number = models.IntegerField(
        _("registration number"), null=True
    )
    examination_year = models.IntegerField(_("examination year"), null=True)
    certified_expert = models.CharField(
        _("certified expert"), max_length=100, null=True
    )
    observations = models.CharField(
        _("observations"), max_length=1000, null=True
    )

    lat = models.FloatField(_("latitude"), null=True)
    lng = models.FloatField(_("longitude"), null=True)

    county = models.CharField(_("county"), max_length=60)
    address = models.CharField(_("address"), max_length=250, null=True)
    post_code = models.CharField(_("post code"), max_length=250)
    locality = models.CharField(_("locality"), max_length=20)

    year_built = models.IntegerField(_("year built"), null=True)
    height_regime = models.CharField(
        _("height regime"), max_length=50, null=True
    )
    apartment_count = models.IntegerField(_("apartment count"), null=True)
    surface = models.FloatField(_("surface"), null=True)

    cadastre_number = models.IntegerField(_("cadastre number"), null=True)
    land_registry_number = models.CharField(
        _("land registry number"), max_length=50, null=True
    )
    administration_update = models.DateField(
        _("administration update"), null=True, blank=True
    )
    admin_update = models.DateField(_("admin update"), null=True, blank=True)

    status = models.SmallIntegerField(
        _("status"), default=0, choices=BUILDING_STATUS_CHOICES, db_index=True
    )

    created_on = models.DateTimeField(
        _("created on"), default=timezone.now, blank=True
    )

    class Meta:
        verbose_name = _("building")
        verbose_name_plural = _("buildings")

    def __str__(self):
        return self.address


class BuildingResource(resources.ModelResource):
    class Meta:
        DATE_FORMAT = {"format": "%d.%m.%Y"}

        model = Building
        exclude = ("id",)
        import_id_fields = ("general_id",)

        widgets = {
            "administration_update": DATE_FORMAT,
            "admin_update": DATE_FORMAT,
        }

        verbose_name = _("building resource")
        verbose_name_plural = _("building resources")


class CsvFile(models.Model):
    NOT_TRIED = 0
    SUCCESS = 1
    UNSUCCESS = -1

    STATUS_CHOICES = [
        (UNSUCCESS, _("Unsuccess")),
        (NOT_TRIED, _("Not tried")),
        (SUCCESS, _("Success")),
    ]

    name = models.CharField(_("name"), max_length=255)
    file = models.FileField(_("file"))
    status = models.SmallIntegerField(
        _("status"), default=NOT_TRIED, editable=False, choices=STATUS_CHOICES
    )

    class Meta:
        verbose_name = _("CSV file")
        verbose_name_plural = _("CSV files")

    def __str__(self):
        return self.name
