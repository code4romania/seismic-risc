from blog.views import PostViewSet, TagViewSet
from buildings.views import BuildingViewSet, building_search, statistics
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path
from pages.views import PagesViewSet
from rest_framework import routers
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

admin.site.site_title = "Seismic Risk Admin"
admin.site.site_header = "Seismic Risk Admin"
admin.site.index_title = "Seismic Risk Admin"
admin.site.site_url = settings.SITE_URL

router = routers.DefaultRouter()
router.register(r"buildings", BuildingViewSet, basename="buildings")
router.register(r"pages", PagesViewSet, basename="pages")
router.register(r"posts", PostViewSet, basename="posts")
router.register(r"tags", TagViewSet, basename="tags")


urlpatterns = (
    i18n_patterns(
        # URL patterns which accept a language prefix
        path(
            "admin/password_reset/",
            auth_views.PasswordResetView.as_view(),
            name="admin_password_reset",
        ),
        path(
            "admin/password_reset/done/",
            auth_views.PasswordResetDoneView.as_view(),
            name="password_reset_done",
        ),
        path(
            "admin/reset/<uidb64>/<token>/",
            auth_views.PasswordResetConfirmView.as_view(),
            name="password_reset_confirm",
        ),
        path(
            "admin/reset/done/",
            auth_views.PasswordResetCompleteView.as_view(),
            name="password_reset_complete",
        ),
        path("admin/", admin.site.urls),
        path("ckeditor/", include("ckeditor_uploader.urls")),
    )
    + [
        # URL patterns which do not use a language prefix
        path(
            "api/v1/buildings/search", building_search, name="building_search"
        ),
        path("api/v1/", include(router.urls)),
        path("api/v1/statistics/", statistics, name="statistics"),
        path("i18n/", include("django.conf.urls.i18n")),
        path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "api/v1/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="swagger-ui"),
            name="swagger-ui",
        ),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)
