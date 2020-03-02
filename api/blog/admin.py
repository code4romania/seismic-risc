from django.contrib import admin

from .models import Post, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)


class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ("title", "category", "slug", "created", "published", "is_visible")
    fieldsets = [
        (
            None,
            {
                "fields": (
                    "category",
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
        ("Text", {"classes": ("full-width",), "fields": ("text",)}),
    ]


admin.site.register(Post, PostAdmin)
