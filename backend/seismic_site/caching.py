from typing import Any

from django.core.cache import caches


def get_from_cache(data_key: str, data_default: Any = object()) -> Any:
    cached_data = caches["memory"].get(data_key, data_default)

    if cached_data is data_default:
        cached_data = caches["default"].get(data_key, data_default)
        if cached_data is not data_default:
            caches["memory"].set(data_key, cached_data)

    return cached_data


def set_to_cache(data_key: str, data: Any, timeout: int = None) -> None:
    for cache in caches.all():
        cache.set(data_key, data, timeout=timeout)


def delete_from_cache(data_key: str) -> None:
    for cache in caches.all():
        cache.delete(data_key)
