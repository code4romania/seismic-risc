from rest_framework import serializers
from taggit_serializer.serializers import (
    TagListSerializerField,
    TaggitSerializer,
)
from taggit.models import Tag
from .models import Post


class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ("name", "slug")


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Post
        fields = [
            "author",
            "title",
            "slug",
            "image",
            "text",
            "tags",
            "published",
            "created",
            "updated",
        ]
