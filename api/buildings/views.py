from rest_framework import viewsets
from buildings.serializers import BuildingSerializer
from buildings.models import Building


class BuildingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows buildings to be viewed or edited.
    """

    queryset = Building.objects.all().order_by("-created_on")
    serializer_class = BuildingSerializer
    lookup_field = "general_id"
