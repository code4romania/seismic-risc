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
            "street_number",
            "locality",
            "county",
            "year_built",
            "height_regime",
            "status",
        )


class PublicBuildingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = (
            "street_number",
            "address",
            "county",
            "locality",
            "lat",
            "lng",
            "height_regime",
            "risk_category",
        )


class BuildingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ("general_id", "risk_category", "lat", "lng")


class SearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=100)


class BuildingSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ("general_id", "lat", "lng", "address", "street_number")


class StatisticSerializer(serializers.ModelSerializer):
    evaluated_buildings = serializers.SerializerMethodField("get_total_buildings")

    @staticmethod
    def get_total_buildings(_):
        total_buildings = Building.approved.count()
        return int(total_buildings)

    class Meta:
        model = Statistic
        fields = [
            "people_under_risk",
            "consolidated_buildings",
            "evaluated_buildings",
        ]
