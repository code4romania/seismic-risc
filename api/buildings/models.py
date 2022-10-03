from enum import Enum
from io import BytesIO

import PIL.Image
import math
import sys
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.translation import get_language, gettext_lazy as _


class SeismicCategoryChoice(Enum):
    NA = _("N/A")
    U1 = _("U1")
    U2 = _("U2")
    U3 = _("U3")
    U4 = _("U4")
    RS1 = _("RS I")
    RS2 = _("RS II")
    RS3 = _("RS III")
    RS4 = _("RS IV")
    C = _("Consolidated")

    @classmethod
    def choices(cls):
        return [(i.name, i.value) for i in cls]


class ConsolidationChoice(Enum):
    NO = _("no")
    YES_PRIVATE = _("yes, with private funding")
    YES_PUBLIC = _("yes, with public funding")
    DEMOLISHED = _("demolished")

    @classmethod
    def choices(cls):
        return [(i.name, i.value) for i in cls]


class ContactChoice(Enum):
    NONE = _("None")
    OWNER = _("Owner")
    TENANT = _("Tenant")
    ADMIN = _("Head of the owners' association")

    @classmethod
    def choices(cls):
        return [(i.name, i.value) for i in cls]


class BuildingWorkPerformed(models.Model):
    name_en = models.CharField("work name", max_length=200, unique=True, blank=False, default="")
    name_ro = models.CharField("denumire lucrare", max_length=200, unique=True, blank=False, default="")

    @property
    def work_name(self):
        current_language = get_language()
        if "ro" in current_language:
            return self.name_ro
        else:
            return self.name_en

    def __str__(self):
        return self.work_name

    class Meta:
        verbose_name = _("work performed")
        verbose_name_plural = _("works performed")


class BuildingProximalUtilities(models.Model):
    name_en = models.CharField("utility name", max_length=200, unique=True, blank=False, default="")
    name_ro = models.CharField("denumire utilitate", max_length=200, unique=True, blank=False, default="")

    @property
    def utility_name(self):
        current_language = get_language()
        if "ro" in current_language:
            return self.name_ro
        else:
            return self.name_en

    def __str__(self):
        return self.utility_name

    class Meta:
        verbose_name = _("proximal utility")
        verbose_name_plural = _("proximal utilities")


class ApprovedBuilding(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status=Building.ACCEPTED)


class Building(models.Model):
    PENDING = 0
    ACCEPTED = 1
    REJECTED = -1
    BUILDING_STATUS_CHOICES = [
        (PENDING, _("Pending")),
        (ACCEPTED, _("Accepted")),
        (REJECTED, _("Rejected")),
    ]

    general_id = models.AutoField(_("general id"), primary_key=True)
    parent_id = models.ForeignKey("self", models.SET_NULL, verbose_name=_("parent id"), blank=True, null=True)

    status = models.SmallIntegerField(_("status"), default=PENDING, choices=BUILDING_STATUS_CHOICES, db_index=True)

    street_number = models.CharField(_("street number"), max_length=100)
    address = models.CharField(_("address"), max_length=250, null=True)
    county = models.CharField(_("county"), max_length=60)
    locality = models.CharField(_("locality"), max_length=60)

    lat = models.FloatField(_("latitude"), null=True)
    lng = models.FloatField(_("longitude"), null=True)

    risk_category = models.CharField(
        _("risk category"),
        max_length=3,
        choices=SeismicCategoryChoice.choices(),
        default=SeismicCategoryChoice.NA,
        db_index=True,
    )
    height_regime = models.CharField(_("height regime"), max_length=50, null=True)

    is_still_present = models.BooleanField(_("is standing"), default=True, null=True, blank=True)
    consolidation_status = models.CharField(
        _("is consolidated"),
        max_length=32,
        choices=ConsolidationChoice.choices(),
        default=ConsolidationChoice.NO,
        db_index=True,
    )

    work_performed = models.ManyToManyField(
        BuildingWorkPerformed,
        verbose_name=_("work performed"),
        through="BuildingWorkPerformedEvent",
        through_fields=("building", "work_performed"),
        blank=True,
    )
    apartment_count = models.IntegerField(_("apartment count"), null=True, blank=True)
    permanently_occupied_apartment_count = models.IntegerField(
        _("permanently inhabited apartment count"), null=True, blank=True
    )
    residents_count = models.IntegerField(_("resident count"), null=True, blank=True)
    owners_count = models.IntegerField(_("owner count"), null=True, blank=True)
    public_apartment_count = models.IntegerField(_("public apartment count"), null=True, blank=True)
    public_owners = models.CharField(_("public owners"), null=False, default="", blank=True, max_length=200)
    rented_apartment_count = models.IntegerField(_("rented apartment count"), null=True, blank=True)

    has_owners_association = models.BooleanField(_("has owners association"), null=True, blank=True, default=None)
    apartments_with_6_months_debt = models.IntegerField(_("6 month debt apartment count"), null=True, blank=True)
    disconnected_utilities = models.CharField(
        _("disconnected utilities"), null=False, default="", blank=True, max_length=200
    )
    broken_utilities = models.CharField(_("broken utilities"), null=False, default="", blank=True, max_length=200)

    office_count = models.IntegerField(_("office count"), null=True, blank=True)
    commercial_space_count = models.IntegerField(_("commercial space count"), null=True, blank=True)
    self_owned_commercial_space_count = models.IntegerField(
        _("self-owned commercial space count"), null=True, blank=True
    )
    proximal_utilities = models.ManyToManyField(
        BuildingProximalUtilities, verbose_name=_("proximal utilities"), blank=True
    )
    proximal_utilities_description = models.CharField(
        _("proximal utilities description"), null=False, default="", blank=True, max_length=200
    )

    full_name = models.CharField(_("full name"), null=True, blank=True, max_length=75)
    email_address = models.EmailField(_("email address"), null=True, blank=True)
    phone_number = models.CharField(_("phone number"), null=True, blank=True, max_length=15)
    type_of_contact = models.CharField(
        _("status"), max_length=20, choices=ContactChoice.choices(), default=ContactChoice.NONE, db_index=True
    )
    necessary_support = models.CharField(_("support needed"), null=True, blank=True, max_length=1000)

    registration_number = models.IntegerField(_("registration number"), null=True, blank=True)
    examination_year = models.IntegerField(_("examination year"), null=True, blank=True)
    certified_expert = models.CharField(_("certified expert"), max_length=100, null=False, default="", blank=True)
    observations = models.CharField(_("observations"), max_length=1000, null=False, default="", blank=True)
    has_warning_panels = models.BooleanField(_("has warning panels"), null=True, blank=True, default=None)

    year_built = models.IntegerField(_("year built"), null=True, blank=True)
    surface = models.FloatField(_("residential surface"), null=True, blank=True)
    other_spaces_surface = models.FloatField(_("other surface"), null=True, blank=True)

    cadastre_number = models.IntegerField(_("cadastre number"), null=True, blank=True)
    land_registry_number = models.CharField(
        _("land registry number"), max_length=50, null=False, default="", blank=True
    )
    administration_update = models.DateField(_("administration update"), null=True, blank=True)
    admin_update = models.DateField(_("admin update"), null=True, blank=True)

    created_on = models.DateTimeField(_("created on"), default=timezone.now, blank=True)

    objects = models.Manager()
    approved = ApprovedBuilding()

    class Meta:
        verbose_name = _("building")
        verbose_name_plural = _("buildings")

    def __str__(self):
        return f"{self.address}, {self.street_number} - {self.county}, {self.locality}"


class BuildingWorkPerformedEvent(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    work_performed = models.ForeignKey(BuildingWorkPerformed, on_delete=models.CASCADE)

    date_performed = models.DateField(_("date work performed"), blank=True)

    class Meta:
        verbose_name = _("work performed event")
        verbose_name_plural = _("work performed events")


class Statistic(models.Model):
    people_under_risk = models.IntegerField(_("people under risk"), null=True)

    class Meta:
        verbose_name = _("statistic")
        verbose_name_plural = _("statistics")

    def __str__(self):
        return "Statistics"


class DataFile(models.Model):
    NOT_TRIED = 0
    SUCCESS = 1
    FAILURE = -1

    DATA_FILE_STATUS_CHOICES = [
        (NOT_TRIED, _("Not tried")),
        (SUCCESS, _("Imported successfully")),
        (FAILURE, _("Import failed")),
    ]

    name = models.CharField(_("name"), unique=True, max_length=255)
    file = models.FileField(_("file"))
    status = models.SmallIntegerField(_("status"), default=0, editable=False, choices=DATA_FILE_STATUS_CHOICES)

    class Meta:
        verbose_name = _("Data file")
        verbose_name_plural = _("Data files")

    def __str__(self):
        return self.name


class ApprovedImage(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status=ImageFile.ACCEPTED)


class ImageFile(models.Model):
    PENDING = 0
    ACCEPTED = 1
    REJECTED = -1

    IMAGE_STATUS_CHOICES = [
        (PENDING, _("Pending")),
        (ACCEPTED, _("Accepted")),
        (REJECTED, _("Rejected")),
    ]

    def check_extension(self):
        name_parts = str(self.name).split(".")
        if len(name_parts) < 2:
            raise ValidationError(_("Image name does not contain an extension"))
        if name_parts[-1].lower() not in settings.ACCEPTED_IMAGE_TYPES.keys():
            raise ValidationError(
                _("Image extension is not accepted. Choose one of {}").format(
                    list(settings.ACCEPTED_IMAGE_TYPES.keys())
                )
            )

    def check_image_limit(building):
        if ImageFile.objects.filter(building=building).count() >= settings.ALLOWED_IMAGES_LIMIT:
            raise ValidationError(_("Image limit for building is reached ({})").format(settings.ALLOWED_IMAGES_LIMIT))

    def image_thumb(self):
        return mark_safe('<a href={0}><img src="{0}" url width="50" height="50" /></a>'.format(str(self.url)))

    def image_name(self):
        return mark_safe(self.image.name)

    image_thumb.short_description = "Thumbnail"

    building = models.ForeignKey(
        Building, validators=(check_image_limit,), on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(default=_("Add image file"), upload_to="images/", validators=(check_extension,))
    status = models.SmallIntegerField(_("status"), default=PENDING, choices=IMAGE_STATUS_CHOICES, db_index=True)

    objects = models.Manager()
    approved = ApprovedImage()

    def __str__(self):
        return self.image.name

    @staticmethod
    def image_resize_dimensions(im):
        resize = settings.IMAGE_RESIZE
        width, height = im.size
        downscale = resize / max(height, width)
        return math.ceil(width * downscale), math.ceil(height * downscale)

    def _handle_image(self):
        # Opening the uploaded image
        im = PIL.Image.open(self.image)

        output = BytesIO()

        # Resize the image based on relative dimensions to settings.IMAGE_RESIZE
        im = im.resize(self.image_resize_dimensions(im))

        # extract key from settings dictionary for accepted image types
        extension = str(self.image.name).split(".")[-1].lower()
        accepted_extension = settings.ACCEPTED_IMAGE_TYPES[extension]

        # after modifications, save it to the output
        im.save(
            output,
            format=accepted_extension.upper(),
            quality=settings.QUALITY_DEFINITIONS[accepted_extension.upper()],
        )
        output.seek(0)

        # change the imagefield value to be the newly modified image value
        self.image = InMemoryUploadedFile(
            output,
            "ImageField",
            "{}.{}".format(self.image.name.split(".")[0], accepted_extension.lower()),
            "image/{}".format(accepted_extension.lower()),
            sys.getsizeof(output),
            None,
        )

    def save(self, **kwargs):
        # Check if image exists
        previous = ImageFile.objects.get(pk=self.pk) if self.pk else None

        # If there is no previous image or image has changed apply handling logic
        if not previous or previous.image != self.image:
            self._handle_image()

        super(ImageFile, self).save()

    @property
    def url(self):
        return self.image.url
