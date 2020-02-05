from django.contrib import admin

from .models import Page, Category, Attachment


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)


class DocumentInline(admin.TabularInline):
    model = Attachment


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "updated_on", "is_published")
    list_filter = ("is_published",)
    # prepopulated_fields = {"slug": ("title",)}
    inlines = [DocumentInline]
