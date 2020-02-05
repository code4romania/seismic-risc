from ckeditor.fields import RichTextField
from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(
        blank=False, null=False, max_length=150, unique=True
    )

    def __str__(self):
        return "{}".format(self.name)

    class Meta:
        verbose_name_plural = "categories"


class Page(models.Model):
    category = models.ForeignKey(
        Category,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        help_text="Page category",
    )
    title = models.CharField(blank=True, max_length=150, help_text="Page title")
    slug = models.SlugField(
        unique=True,
        blank=True,
        null=False,
        help_text="Unique URL slug (leave empty to auto-generate)",
    )
    content = RichTextField()
    updated_on = models.DateTimeField(
        auto_now=timezone.now,
        blank=True,
        null=True,
        editable=False,
        help_text="Last update time",
    )
    publishing_date = models.DateTimeField(
        blank=True, null=True, help_text="Public page publishing date"
    )
    is_published = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Is this page visible on the website",
    )

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
        help_text="Page attachment",
    )
    name = models.CharField(max_length=150, help_text="Attachment name")
    upload_date = models.DateTimeField(
        auto_now=timezone.now, help_text="Attachment upload date"
    )
    uploaded_file = models.FileField(
        upload_to="uploads/%Y/%m/%d/", max_length=100
    )

    def __str__(self):
        return "{}{}".format(self.uploaded_file.url, self.name)


# class InlineResource(models.Model):
#     pass
