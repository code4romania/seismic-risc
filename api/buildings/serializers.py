from rest_framework import serializers

from .models import Building, Statistic


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = (
            "general_id",
            "risk_category",
            "examination_year",
            "certified_expert",
            "lat",
            "lng",
            "address",
            "post_code",
            "locality",
            "county",
            "year_built",
            "height_regime",
            "status",
        )


class BuildingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ("general_id", "risk_category", "lat", "lng")


class BuildingSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ("general_id", "lat", "lng", "address", "post_code")


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
