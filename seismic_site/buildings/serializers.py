from rest_framework import serializers
from buildings.models import Building


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        exclude = []  # TODO: restrict to the necessary fields if needed
