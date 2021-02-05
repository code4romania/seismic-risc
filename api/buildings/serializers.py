from rest_framework import serializers

from .models import Building, Statistic


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        exclude = ()  # TODO: restrict to the necessary fields if needed


class StatisticSerializer(serializers.ModelSerializer):
    evaluated_buildings = serializers.SerializerMethodField(
        "get_total_buildings"
    )

    def get_total_buildings(self, obj):
        total_buildings = Building.objects.count()
        return int(total_buildings)

    class Meta:
        model = Statistic
        fields = [
            "people_under_risk",
            "consolidated_buildings",
            "evaluated_buildings",
        ]
