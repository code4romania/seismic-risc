from rest_framework import routers

from buildings import views


router = routers.DefaultRouter()

router.register(r"buildings", views.BuildingViewSet, basename="buildings")
