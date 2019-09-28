from django.shortcuts import render, get_object_or_404

from .models import Page


def view_page(request, slug):
    page = get_object_or_404(Page, slug=slug, is_published=True)
    return render(
        request,
        'cms/view_page.html', {
            'page': page
        })
