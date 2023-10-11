from django.core.cache import cache
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import BUILDINGS_LISTING_CACHE_KEY, Building, Statistic


@receiver(post_save, sender=Building)
def refresh_cache(instance: Building, **kwargs):
    if not isinstance(instance, Building):
        return

    cache.delete(BUILDINGS_LISTING_CACHE_KEY)


@receiver(post_save, sender=Building)
def refresh_statistics(instance: Building, **kwargs):
    if not isinstance(instance, Building):
        return

    Statistic.update_statistics()
