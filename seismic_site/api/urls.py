from django.urls import path
from . import views

urlpatterns = [
    # post views
    path('building/<int:id>/', views.building, name='building'),
    path('buildings', views.buildings, name='buildings'),
]
