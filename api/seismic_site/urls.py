from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from buildings.views import BuildingViewSet
from pages.views import PagesViewSet
from blog.views import PostViewSet


router = routers.DefaultRouter()
router.register(r"buildings", BuildingViewSet, basename="buildings")
router.register(r"pages", PagesViewSet, basename="pages")
router.register(r"posts", PostViewSet, basename="posts")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("ckeditor/", include("ckeditor_uploader.urls")),
    path("api/v1/", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
