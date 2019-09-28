from django.urls import path
from . import views

urlpatterns = [
    path('<slug:url_name>/', views.view_page, name='view_page')
]
