from django.db import models

from taggit.managers import TaggableManager
from ckeditor_uploader.fields import RichTextUploadingField

class Category(models.Model):
    name = models.CharField(
        blank=False, null=False, max_length=150, unique=True
    )

    def __str__(self):
        return "{}".format(self.name)

    class Meta:
        verbose_name_plural = "categories"


class Post(models.Model):
    category = models.ForeignKey(
        Category,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        help_text="Blog category",
    )
    author = models.ForeignKey("auth.User", on_delete=models.PROTECT)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to="blog/")
    text = RichTextUploadingField()
    tags = TaggableManager()
    is_visible = models.BooleanField(default=False)
    published = models.DateTimeField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        from django.urls import reverse

        return reverse("post_detail", args=[self.slug])

    def __str__(self):
        return self.title
