from django.conf import settings
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        status = self.create_superuser()

        if status == 0:
            self.stdout.write(self.style.SUCCESS("Super admin has been created"))
        else:
            self.stdout.write(self.style.SUCCESS("Super admin already exists"))

    @staticmethod
    def create_superuser():
        admin_user = User.objects.filter(is_superuser=True)

        if admin_user:
            return -1

        superuser = User()

        superuser.is_active = True
        superuser.is_superuser = True
        superuser.is_staff = True

        superuser.username = superuser.email = settings.SUPER_ADMIN_EMAIL
        superuser.first_name = settings.SUPER_ADMIN_FIRST_NAME
        superuser.last_name = settings.SUPER_ADMIN_LAST_NAME
        superuser.set_password(settings.SUPER_ADMIN_PASS)

        superuser.save()

        return 0
