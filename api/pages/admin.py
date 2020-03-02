from django.contrib import admin

from .models import Page, Attachment


class DocumentInline(admin.TabularInline):
    model = Attachment


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "updated_on", "is_published")
    list_filter = ("is_published",)
    # prepopulated_fields = {"slug": ("title",)}
    inlines = [DocumentInline]
