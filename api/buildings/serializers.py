from django.conf import settings
from rest_framework import serializers

from .models import Building, Statistic


class ImageUrlRelatedField(serializers.StringRelatedField):
    def to_representation(self, value):
        return value.url


class BaseBuildingSerializer(serializers.ModelSerializer):
    county_code = serializers.SerializerMethodField("get_county_code")

    @staticmethod
    def get_county_code(obj: Building):
        return settings.COUNTIES_MAPPING[obj.county]


class BuildingSerializer(BaseBuildingSerializer):
    images = ImageUrlRelatedField(many=True, read_only=True)

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
            "county_code",
            "year_built",
            "height_regime",
            "status",
            "images",
        )


class PublicBuildingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = (
            "parent_id",
            "street_number",
            "address",
            "county",
            "locality",
            "lat",
            "lng",
            "risk_category",
            "height_regime",
            "full_name",
            "email_address",
            "phone_number",
            "type_of_contact",
            "necessary_support",
            "is_still_present",
            "consolidation_status",
            "work_performed",
            "apartment_count",
            "permanently_occupied_apartment_count",
            "residents_count",
            "owners_count",
            "public_apartment_count",
            "public_owners",
            "rented_apartment_count",
            "has_owners_association",
            "apartments_with_6_months_debt",
            "disconnected_utilities",
            "broken_utilities",
            "office_count",
            "commercial_space_count",
            "self_owned_commercial_space_count",
            "proximal_utilities",
            "proximal_utilities_description",
            "images",
        )


class BuildingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ("general_id", "risk_category", "lat", "lng")


class SearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=100)
    riskCategory = serializers.CharField(required=False, default="")


class BuildingSearchSerializer(BaseBuildingSerializer):
    class Meta:
        model = Building
        fields = ("general_id", "lat", "lng", "address", "street_number", "locality", "county_code")


class StatisticSerializer(serializers.ModelSerializer):
    evaluated_buildings = serializers.SerializerMethodField("get_total_buildings")
    consolidated_buildings = serializers.SerializerMethodField("get_consolidated_buildings")

    @staticmethod
    def get_total_buildings(_):
        total_buildings = Building.approved.count()
        return int(total_buildings)

    @staticmethod
    def get_consolidated_buildings(_):
        consolidated_buildings = Building.approved.filter(risk_category="C").count()
        return int(consolidated_buildings)

    class Meta:
        model = Statistic
        fields = [
            "people_under_risk",
            "consolidated_buildings",
            "evaluated_buildings",
        ]
