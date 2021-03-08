from django.contrib.postgres.search import TrigramSimilarity
from django.conf import settings

from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response

from .serializers import (
    BuildingSerializer,
    BuildingListSerializer,
    BuildingSearchSerializer,
    StatisticSerializer,
)
from .models import Building, Statistic


class BuildingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows buildings to be viewed or edited.
    """

    lookup_field = "general_id"

    def get_queryset(self):
        return Building.objects.all().filter(status=1).order_by("general_id")

    def get_serializer_class(self):
        if self.action == "list":
            return BuildingListSerializer
        return BuildingSerializer


@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def building_search(request):
    query = request.GET.get("query")

    buildings = (
        Building.objects.annotate(
            similarity=TrigramSimilarity("address", query)
        )
        .filter(status=1, similarity__gt=settings.TRIGRAM_SIMILARITY_THRESHOLD)
        .order_by("-similarity")
    )

    serializer = BuildingSearchSerializer(buildings, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def statistics(self):
    statistics = Statistic.objects.first()
    serializer = StatisticSerializer(statistics, many=False)

    return Response(serializer.data)
