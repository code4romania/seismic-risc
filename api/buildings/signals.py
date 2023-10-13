from django.db.models.signals import post_save
from django.dispatch import receiver

from seismic_site.caching import delete_from_cache
from .models import BUILDINGS_LISTING_CACHE_KEY, Building, Statistic


@receiver(post_save, sender=Building)
def refresh_cache(instance: Building, **kwargs):
    if not isinstance(instance, Building):
        return

    delete_from_cache(BUILDINGS_LISTING_CACHE_KEY)


@receiver(post_save, sender=Building)
def refresh_statistics(instance: Building, **kwargs):
    if not isinstance(instance, Building):
        return

    Statistic.update_statistics()
