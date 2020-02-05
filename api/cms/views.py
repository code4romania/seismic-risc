from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets

from .serializers import PageSerializer
from .models import Page


def view_page(request, slug):
    page = get_object_or_404(Page, slug=slug, is_published=True)
    return render(request, "cms/view_page.html", {"page": page})


class PagesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows buildings to be viewed or edited.
    """

    queryset = Page.objects.all().order_by("-publishing_date")
    serializer_class = PageSerializer
    lookup_field = "slug"
