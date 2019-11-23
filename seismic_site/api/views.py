from django.http import HttpResponse
from django.core import serializers

from buildings import models


def buildings(request):
    buildings = serializers.serialize(
        "json",
        models.Building.objects.all(),
        fields=("lat", "lng", "risk_category"),
    )
    return HttpResponse(buildings, content_type="application/json")


def building(request, id):
    buildings = serializers.serialize(
        "json", models.Building.objects.filter(pk=id)
    )
    return HttpResponse(buildings, content_type="application/json")
