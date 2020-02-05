"""seismic_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from . import views
from cms.router import router as cms_router

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    # API
    path(
        "api/v2/",
        include(("buildings.urls", "buildings"), namespace="buildings-api"),
    ),
    path("api/v2/", include(cms_router.urls)),
    path("jet/", include("jet.urls", "jet")),
    path("admin/", admin.site.urls),
    path("account/", include("account.urls")),
    path("page/", include("cms.urls")),
    path("adauga", views.add_building, name="add-building"),
    path("", views.index, name="index"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
