from rest_framework import serializers
from cms.models import Page


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        exclude = ()  # TODO: restrict to the necessary fields if needed
