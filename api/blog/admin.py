from django.contrib import admin

from .models import Post


class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ("title", "slug", "created", "published", "is_visible")
    fieldsets = [
        (
            None,
            {
                "fields": (
                    "author",
                    "title",
                    "slug",
                    "image",
                    "tags",
                    "published",
                    "is_visible",
                )
            },
        ),
        ("Preview", {"classes": ("full-width",), "fields": ("preview_text",)}),
        ("Text", {"classes": ("full-width",), "fields": ("text",)}),
    ]


admin.site.register(Post, PostAdmin)
