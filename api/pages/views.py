from rest_framework import viewsets

from .serializers import PageSerializer
from .models import Page


class PagesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows pages to be viewed or edited.
    """

    queryset = Page.objects.all().order_by("-publishing_date")
    serializer_class = PageSerializer
    lookup_field = "slug"
