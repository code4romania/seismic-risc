import pytest
import random, string

from buildings.models import Building
from buildings.serializers import BuildingListSerializer
from django.urls import reverse

base_url = "/api/v1/buildings"


@pytest.mark.django_db
def test_building_list_get(basic_building_data, api_client):
    for _ in range(3):
        building_obj = Building.objects.create(**basic_building_data)

    url = f"{base_url}/"
    response = api_client.get(url)

    assert response.status_code == 200
    for building in response.data:
        for key in building.keys():
            assert key in BuildingListSerializer.Meta.fields


@pytest.mark.django_db
def test_building_details_get(basic_building_data, api_client):
    building_obj = Building.objects.create(**basic_building_data)

    url = f"{base_url}/{building_obj.general_id}/"
    response = api_client.get(url)

    assert response.status_code == 200
    for key in basic_building_data.keys():
        assert response.data[key] == basic_building_data[key]


@pytest.mark.django_db
def test_building_post_forbidden(basic_building_data, api_client):
    response = api_client.post(
        f"{base_url}/", basic_building_data, format="json"
    )
    assert response.status_code == 403


@pytest.mark.django_db
def test_building_delete_forbidden(basic_building_data, api_client):
    building_obj = Building.objects.create(**basic_building_data)

    url = f"{base_url}/{building_obj.general_id}/"
    response = api_client.delete(url)

    assert response.status_code == 403


@pytest.mark.django_db
@pytest.mark.skip(reason="SIMILARITY available only in dev environment")
def test_building_search(basic_building_data, random_words, api_client):
    building_data = basic_building_data

    for random_word in random_words:
        building_data["address"] = random_word
        building_obj = Building.objects.create(**basic_building_data)

    for random_word in random_words:
        response = api_client.get(f"{base_url}/search?query={random_word}/")
        assert response.status_code == 200
        assert response.data[0]["address"] == random_word


@pytest.fixture
def random_words():
    length = 5
    how_many = 4
    letters = string.ascii_lowercase
    return [
        "".join(random.choice(letters) for i in range(length))
        for _ in range(how_many)
    ]


@pytest.fixture
def basic_building_data():
    return {
        "risk_category": "U1",
        "county": "Bucuresti",
        "post_code": "020244",
        "locality": "2",
        "status": 0,
    }
