from django.core.serializers import serialize
from django.shortcuts import render
from map_app.models import Building, BuildingEncoder


def index(request):
    return render(request, "index.html",
                  context={"building_data": serialize('json', Building.objects.all(), cls=BuildingEncoder)})
