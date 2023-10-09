from django.core.cache import cache
from django.db.models import QuerySet
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import BUILDINGS_LISTING_CACHE_KEY, BUILDINGS_LISTING_CACHE_TIMEOUT, Building, Statistic


@receiver(post_save, sender=Building)
def refresh_cache(instance: Building, **kwargs):
    if not isinstance(instance, Building):
        return

    cache.delete(BUILDINGS_LISTING_CACHE_KEY)

    query: QuerySet[Building] = Building.approved.all().order_by("general_id")
    cache.set(BUILDINGS_LISTING_CACHE_KEY, query, timeout=BUILDINGS_LISTING_CACHE_TIMEOUT)


@receiver(post_save, sender=Building)
def refresh_statistics(instance: Building, **kwargs):
    if not isinstance(instance, Building):
        return

    Statistic.update_statistics()
