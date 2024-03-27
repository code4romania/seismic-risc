import pytest


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def test_user(db, django_user_model, basic_user_data):
    return django_user_model.objects.create_user(**basic_user_data)


@pytest.fixture
def basic_user_data():
    return {"username": "testuser", "password": "testpassword"}
