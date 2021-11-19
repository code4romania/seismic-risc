import random
import string
from collections import namedtuple

import pytest

from buildings.models import Building, ImageFile
from buildings.serializers import BuildingListSerializer
from seismic_site import settings

base_url = "/api/v1/buildings"


@pytest.mark.django_db
def test_image_resize():
    height, width = (800, 1600)
    image = namedtuple("Image", "size")
    im = image((width, height))
    resized_w, resized_h = ImageFile.image_resize_dimensions(im)
    assert (resized_h, resized_w) == (settings.IMAGE_RESIZE / 2, settings.IMAGE_RESIZE)


@pytest.mark.django_db
def test_building_list_get_if_status_is_approved(approved_building_data, api_client):
    for _ in range(3):
        Building.objects.create(**approved_building_data)

    url = f"{base_url}/"
    response = api_client.get(url)

    assert response.status_code == 200
    for building in response.data:
        for key in building.keys():
            assert key in BuildingListSerializer.Meta.fields


@pytest.mark.django_db
def test_building_details_get_if_status_is_approved(approved_building_data, api_client):
    building_obj = Building.objects.create(**approved_building_data)

    url = f"{base_url}/{building_obj.general_id}/"
    response = api_client.get(url)

    assert response.status_code == 200
    for key in approved_building_data.keys():
        assert response.data[key] == approved_building_data[key]


@pytest.mark.django_db
def test_building_details_cannot_get_if_status_is_pending(pending_building_data, api_client):
    building_obj = Building.objects.create(**pending_building_data)

    url = f"{base_url}/{building_obj.general_id}/"
    response = api_client.get(url)

    assert response.status_code == 404


@pytest.mark.django_db
def test_building_details_cannot_get_if_status_is_rejected(rejected_building_data, api_client):
    building_obj = Building.objects.create(**rejected_building_data)

    url = f"{base_url}/{building_obj.general_id}/"
    response = api_client.get(url)

    assert response.status_code == 404


@pytest.mark.django_db
def test_building_post_forbidden(approved_building_data, api_client):
    response = api_client.post(f"{base_url}/", approved_building_data, format="json")
    assert response.status_code == 403


@pytest.mark.django_db
def test_building_delete_forbidden(approved_building_data, api_client):
    building_obj = Building.objects.create(**approved_building_data)

    url = f"{base_url}/{building_obj.general_id}/"
    response = api_client.delete(url)

    assert response.status_code == 403


@pytest.mark.django_db
@pytest.mark.skip(reason="SIMILARITY available only in dev environment")
def test_building_search(approved_building_data, random_words, api_client):
    building_data = approved_building_data

    for random_word in random_words:
        building_data["address"] = random_word
        Building.objects.create(**approved_building_data)

    for random_word in random_words:
        response = api_client.get(f"{base_url}/search/?query={random_word}/")
        assert response.status_code == 200
        assert response.data[0]["address"] == random_word


@pytest.fixture
def random_words():
    length = 5
    how_many = 4
    letters = string.ascii_lowercase
    return ["".join(random.choice(letters) for i in range(length)) for _ in range(how_many)]


def basic_building_data():
    return {
        "risk_category": "U1",
        "county": "Bucuresti",
        "street_number": "12",
        "locality": "2",
        "status": 1,
    }


@pytest.fixture
def approved_building_data():
    basic_data = basic_building_data()
    basic_data["status"] = 1
    return basic_data


@pytest.fixture
def pending_building_data():
    basic_data = basic_building_data()
    basic_data["status"] = 0
    return basic_data


@pytest.fixture
def rejected_building_data():
    basic_data = basic_building_data()
    basic_data["status"] = -1
    return basic_data
