from django.utils import timezone
from .serializers import PostSerializer, TagSerializer
from .permissions import IsUserOrReadOnly
from rest_framework import viewsets, filters, pagination
from taggit.models import Tag

from .models import Post


class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that lists blog posts tags
    """

    lookup_field = "slug"
    permissions_classes = (IsUserOrReadOnly,)
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class PostsPagination(pagination.LimitOffsetPagination):
    default_limit = 4
    max_limit = 10


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that lists blog posts
    """

    permissions_classes = (IsUserOrReadOnly,)
    serializer_class = PostSerializer
    pagination_class = PostsPagination
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        "title",
        "text",
        "^author__username",
        "author__first_name",
        "author__last_name",
        "tags__name",
    ]
    ordering_fields = ["created", "updated", "published"]

    def get_queryset(self):
        return (
            Post.objects.all()
            .select_related("author")
            .filter(published__lte=timezone.localtime(), is_visible=True)
            .order_by("-published")
        )
