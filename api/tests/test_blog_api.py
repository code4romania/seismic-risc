import pytest

from blog.models import Post

base_url = "/api/v1/posts"


@pytest.mark.django_db
def test_post_details_get(basic_post_data, api_client, test_user):
    basic_post_data["author_id"] = test_user.id
    post_obj = Post.objects.create(**basic_post_data)

    response = api_client.get(f"{base_url}/{post_obj.id}/")

    assert response.status_code == 200
    assert response.data["slug"] == basic_post_data["slug"]


@pytest.mark.django_db
def test_post_post_forbidden(basic_post_data, api_client):
    response = api_client.post(f"{base_url}/", basic_post_data, format="json")
    assert response.status_code == 403


@pytest.mark.django_db
def test_post_delete_forbidden(basic_post_data, api_client):
    url = f"{base_url}/1/"

    response = api_client.delete(url)
    assert response.status_code == 403


@pytest.fixture
def basic_post_data():
    from django.utils import timezone

    return {
        "title": "Post title",
        "slug": "post1",
        "text": "Contents",
        "is_visible": True,
        "published": timezone.now(),
    }
