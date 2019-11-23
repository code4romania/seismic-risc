from rest_framework import serializers

from .models import Building


class BuildingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Building
        fields = '__all__'  # TODO: restrict to the necessary fields
