from django.urls import path

from . import views


urlpatterns = [path("<slug:slug>/", views.view_page, name="view_page")]
