import pytest


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def basic_page_data():
    # Required fields for Page object
    return {
        "title": "Page title",
        "slug": "pg1",
        "content": "Contents"
    }
