from django.contrib.postgres.search import TrigramSimilarity
from django.conf import settings

from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response

from .serializers import BuildingSerializer, StatisticSerializer
from .models import Building, Statistic


class BuildingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows buildings to be viewed or edited.
    """

    queryset = Building.objects.all().order_by("-created_on")
    serializer_class = BuildingSerializer
    lookup_field = "general_id"


@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def building_search(request):
    query = request.GET.get("query")

    buildings = (
        Building.objects.annotate(
            similarity=TrigramSimilarity("address", query)
        )
        .filter(similarity__gt=settings.TRIGRAM_SIMILARITY_THRESHOLD)
        .order_by("-similarity")
    )

    serializer = BuildingSerializer(buildings, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def statistics(self):
    statistics = Statistic.objects.first()
    serializer = StatisticSerializer(statistics, many=False)

    return Response(serializer.data)
