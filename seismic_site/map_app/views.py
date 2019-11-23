from django.shortcuts import render
from rest_framework import viewsets

from .models import Building
from .serializers import BuildingSerializer


class BuildingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer
