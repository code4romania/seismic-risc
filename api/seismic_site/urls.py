from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from buildings.views import BuildingViewSet
from pages.views import PagesViewSet


router = routers.DefaultRouter()
router.register(r"buildings", BuildingViewSet, basename="buildings")
router.register(r"pages", PagesViewSet, basename="pages")


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("admin/", admin.site.urls),
]
