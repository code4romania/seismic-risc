from django.db import models
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(
        blank=False, null=False, max_length=150, unique=True)
    
    def __str__(self):
        return "{}".format(self.name)

    class Meta:
        verbose_name_plural = "categories"


class Page(models.Model):
    category = models.ForeignKey(
        Category, blank=True, null=True, on_delete=models.SET_NULL,
        help_text="Page category")
    title = models.CharField(
        blank=True, max_length=150,
        help_text="Page title")
    url_name = models.SlugField(
        unique=True, blank=False, null=False,
        help_text="Page URL name")
    content = models.TextField(
        blank=True,
        help_text="Page content")
    updated_on = models.DateTimeField(
        auto_now=timezone.now,
        blank=True, null=True, editable=False,
        help_text="Last update time")
    publishing_date = models.DateTimeField(
        blank=True, null=True,
        help_text="Public page publishing date")
    is_published = models.BooleanField(
        default=False, db_index=True,
        help_text="Is this page visible on the website")
    
    def __str__(self):
        return "{}".format(self.title)


# class InlineResource(models.Model):
#     pass
