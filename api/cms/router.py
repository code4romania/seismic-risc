from rest_framework import routers

from cms import views


router = routers.DefaultRouter()

router.register(r"pages", views.PagesViewSet, basename="pages")
