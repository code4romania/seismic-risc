import logging

import environ
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Command to create a superuser"

    def add_arguments(self, parser):
        parser.add_argument(
            "--email",
            type=str,
            help="Email of the superuser",
            required=True,
        )
        parser.add_argument(
            "--username",
            type=str,
            help="Username of the superuser (default: email)",
            required=False,
        )
        parser.add_argument(
            "--first_name",
            type=str,
            help="First name of the superuser",
            required=False,
        )
        parser.add_argument(
            "--last_name",
            type=str,
            help="Last name of the superuser",
            required=False,
        )

    def handle(self, *args, **kwargs):
        user_model = get_user_model()
        env = environ.Env()

        admin_email = kwargs.get("email")
        admin_username = kwargs.get("username") or admin_email
        admin_first_name = kwargs.get("first_name") or ""
        admin_last_name = kwargs.get("last_name") or ""

        if user_model.objects.filter(email=admin_email).exists():
            logger.info("Super admin already exists")
            return 0

        superuser = user_model(
            email=admin_email,
            username=admin_username,
            first_name=admin_first_name,
            last_name=admin_last_name,
            is_active=True,
            is_superuser=True,
            is_staff=True,
        )
        superuser.set_password(env.str("DJANGO_ADMIN_PASSWORD"))

        superuser.save()

        logger.info("Super admin created successfully")

        return 0
