import pytest

from pages.models import Page

base_url = "/api/v1/pages/"


@pytest.mark.django_db
def test_page_details_get(basic_page_data, api_client):
    Page.objects.create(**basic_page_data)
    page1 = Page.objects.get(slug="pg1")

    url = f"{base_url}pg1/"

    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data["slug"] == page1.slug


@pytest.mark.django_db
def test_page_slugify(basic_page_data, api_client):
    del basic_page_data["slug"]
    basic_page_data["title"] = "This is a title"

    pg1 = Page.objects.create(**basic_page_data)
    pg2 = Page.objects.create(**basic_page_data)
    pg3 = Page.objects.create(**basic_page_data)

    assert pg1.slug == "this-is-a-title"
    assert pg2.slug == "this-is-a-title-1"
    assert pg3.slug == "this-is-a-title-2"


@pytest.mark.django_db
def test_page_post_forbidden(basic_page_data, api_client):
    response = api_client.post(base_url, basic_page_data, format="json")
    assert response.status_code == 403


@pytest.mark.django_db
def test_page_delete_forbidden(basic_page_data, api_client):
    url = f"{base_url}pg1/"

    response = api_client.delete(url)
    assert response.status_code == 403


@pytest.fixture
def basic_page_data():
    # Required fields for Page object
    return {"title": "Page title", "slug": "pg1", "content": "Contents"}
