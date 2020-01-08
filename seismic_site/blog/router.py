from rest_framework import routers

from . import views


router = routers.DefaultRouter()

router.register(
    r'posts',
    views.PostViewSet,
    basename='posts'
)
