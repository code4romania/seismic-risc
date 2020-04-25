from ckeditor.fields import RichTextField
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(
        _("name"), blank=False, null=False, max_length=150, unique=True
    )

    def __str__(self):
        return "{}".format(self.name)

    class Meta:
        verbose_name = _("category")
        verbose_name_plural = _("categories")


class Page(models.Model):
    category = models.ForeignKey(
        Category,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        help_text=_("Page category"),
        verbose_name=_("category"),
    )
    title = models.CharField(
        _("title"), blank=True, max_length=150, help_text=_("Page title")
    )
    slug = models.SlugField(
        _("slug"),
        unique=True,
        blank=True,
        null=False,
        max_length=150,
        help_text=_("Unique URL slug (leave empty to auto-generate)"),
    )
    content = RichTextField(_("content"))
    updated_on = models.DateTimeField(
        _("updated on"),
        auto_now=timezone.now,
        blank=True,
        null=True,
        editable=False,
        help_text=_("Last update time"),
    )
    publishing_date = models.DateTimeField(
        _("publishing date"),
        blank=True,
        null=True,
        help_text=_("Public page publishing date"),
    )
    is_published = models.BooleanField(
        _("is published"),
        default=False,
        db_index=True,
        help_text=_("Is this page visible on the website"),
    )

    class Meta:
        verbose_name = _("page")
        verbose_name_plural = _("pages")

    def __str__(self):
        return "{}".format(self.title)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            is_unique = False
            suffix = 0
            while not is_unique:
                try:
                    existing_page = Page.objects.get(slug=self.slug)
                except Page.DoesNotExist:
                    is_unique = True
                else:
                    if existing_page.id == self.id:
                        is_unique = True
                    else:
                        suffix += 1
                        self.slug = slugify("{} {}".format(self.title, suffix))

        super().save(*args, **kwargs)


class Attachment(models.Model):
    page = models.ForeignKey(
        Page,
        blank=True,
        null=False,
        on_delete=models.CASCADE,
        help_text=_("Page attachment"),
        verbose_name=_("attachment"),
    )
    name = models.CharField(
        _("name"), max_length=150, help_text=_("Attachment name")
    )
    upload_date = models.DateTimeField(
        _("upload date"),
        auto_now=timezone.now,
        help_text=_("Attachment upload date"),
    )
    uploaded_file = models.FileField(
        _("uploaded file"), upload_to="uploads/%Y/%m/%d/", max_length=100
    )

    class Meta:
        verbose_name = _("attachment")
        verbose_name_plural = _("attachments")

    def __str__(self):
        return "{}{}".format(self.uploaded_file.url, self.name)


# class InlineResource(models.Model):
#     pass
