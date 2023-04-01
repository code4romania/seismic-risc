from seismic_site.settings.base import *

DEBUG = True
SECRET_KEY = "test_secret"
SITE_URL = "http://localhost"

SUPER_ADMIN_PASS = env("SUPER_ADMIN_PASS", default="pass")
SUPER_ADMIN_EMAIL = env("SUPER_ADMIN_EMAIL", default="a@a.co")
SUPER_ADMIN_FIRST_NAME = env("SUPER_ADMIN_FIRST_NAME", default="First")
SUPER_ADMIN_LAST_NAME = env("SUPER_ADMIN_LAST_NAME", default="Last")

EMAIL_BACKEND = "django.core.mail.backends.dummy.EmailBackend"

TEST_RUNNER = "tests.runner.PytestTestRunner"
