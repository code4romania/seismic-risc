from django.utils import timezone
from rest_framework import viewsets

from .serializers import PostSerializer
from .models import Post


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that lists blog posts
    """
    queryset = Post.objects.filter(
        published__lte=timezone.now(),
        is_visible=True
    ).order_by('-published')
    serializer_class = PostSerializer
