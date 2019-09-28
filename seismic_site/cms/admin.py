from django.contrib import admin

from .models import Page, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', )


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'updated_on', 'is_published')
    list_filter = ('is_published', )
    # prepopulated_fields = {"slug": ("title",)}
