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
    author_first_name = serializers.ReadOnlyField(source="author.first_name")
    author_last_name = serializers.ReadOnlyField(source="author.last_name")

    class Meta:
        model = Post
        fields = [
            "author_first_name",
            "author_last_name",
            "title",
            "slug",
            "image",
            "text",
            "tags",
            "published",
            "created",
            "updated",
        ]
        extra_kwargs = {"url": {"lookup_field": "slug"}}
