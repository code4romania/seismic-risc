from django.apps import AppConfig
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _


class BuildingsConfig(AppConfig):
    name = "buildings"
    verbose_name = _("Buildings")

    def ready(self):
        from . import signals

        post_save.connect(
            signals.refresh_cache,
            dispatch_uid="refresh_cache",
            sender="buildings.Building",
        )

        post_save.connect(
            signals.refresh_statistics,
            dispatch_uid="refresh_statistics",
            sender="buildings.Building",
        )
