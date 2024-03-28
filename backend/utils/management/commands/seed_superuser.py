import logging

from django.conf import settings

from ._private.seed_user import CommonCreateUserCommand

logger = logging.getLogger(__name__)


class Command(CommonCreateUserCommand):
    help = "Command to create a superuser"

    def handle(self, *args, **kwargs):
        kwargs["last_name"] = "Super"
        kwargs["first_name"] = "User"

        self._create_user(
            admin_email=settings.DJANGO_ADMIN_EMAIL,
            password=settings.DJANGO_ADMIN_PASSWORD,
            is_superuser=True,
            is_staff=True,
            first_name=kwargs.get("first_name", ""),
            last_name=kwargs.get("last_name", ""),
        )
        logger.info("Super admin created successfully")

        return 0
