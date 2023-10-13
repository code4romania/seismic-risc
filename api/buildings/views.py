from typing import List

from django.conf import settings
from django.contrib.postgres.search import TrigramSimilarity
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from seismic_site.caching import get_from_cache, set_to_cache
from .models import (
    BUILDINGS_LISTING_CACHE_KEY,
    Building,
    BuildingProximalUtilities,
    BuildingWorkPerformed,
    Statistic,
)
from .serializers import (
    BuildingListSerializer,
    BuildingSearchSerializer,
    BuildingSerializer,
    ProximalUtilitiesSerializer,
    PublicBuildingCreateSerializer,
    SearchQuerySerializer,
    StatisticSerializer,
    WorkPerformedSerializer,
)


class PublicCreateAnonRateThrottle(AnonRateThrottle):
    rate = "50/day"


class BuildingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows buildings to be viewed or edited.
    """

    lookup_field = "general_id"

    def get_queryset(self):
        return Building.approved.all().order_by("general_id")

    def list(self, request, *args, **kwargs):
        """
        List all buildings
        """
        nonexistent = object()  # sentinel

        cached_data: List = get_from_cache(BUILDINGS_LISTING_CACHE_KEY, nonexistent)

        if cached_data is nonexistent:
            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            cached_data = serializer.data

            set_to_cache(BUILDINGS_LISTING_CACHE_KEY, cached_data)

        return Response(cached_data)

    def get_serializer_class(self):
        if self.action == "list":
            return BuildingListSerializer
        elif self.action == "public_create":
            return PublicBuildingCreateSerializer
        elif self.action == "search":
            return SearchQuerySerializer
        return BuildingSerializer

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[permissions.AllowAny],
        throttle_classes=[PublicCreateAnonRateThrottle],
    )
    def public_create(self, request):
        """
        Special action to allow the public to create a building, while
        keeping the default create action available for staff only
        """
        serializer = PublicBuildingCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="query",
                type=SearchQuerySerializer,
                location=OpenApiParameter.QUERY,
                description="The address of the building",
            )
        ],
        responses=BuildingSearchSerializer,
    )
    @action(
        detail=False,
        permission_classes=[permissions.AllowAny],
    )
    def search(self, request):
        """
        Search a building by its address
        """

        # DRF recommends using request.query_params instead of request.GET
        serializer = SearchQuerySerializer(data=request.query_params)

        if serializer.is_valid():
            query = serializer.data["query"]
            search_category = ("", serializer.data["riskCategory"])[bool(serializer.data["riskCategory"])]
            buildings = (
                Building.approved.annotate(similarity=TrigramSimilarity("address", query))
                .filter(
                    similarity__gt=settings.TRIGRAM_SIMILARITY_THRESHOLD,
                    risk_category__icontains=search_category,
                )
                .order_by("-similarity")
            )
        else:
            buildings = None

        result_serializer = BuildingSearchSerializer(buildings, many=True)
        return Response(result_serializer.data)


class ProximalUtilitiesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BuildingProximalUtilities.objects.all()
    serializer_class = ProximalUtilitiesSerializer


class WorkPerformedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BuildingWorkPerformed.objects.all()
    serializer_class = WorkPerformedSerializer


@extend_schema(request=StatisticSerializer, responses=None)  # TODO: is it really None?
@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def statistics(request):
    stats = Statistic.get_statistic()
    serializer = StatisticSerializer(stats, many=False)

    return Response(serializer.data)
