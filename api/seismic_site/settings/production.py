from typing import List

from seismic_site.settings.base import *

SECRET_KEY = env.str("SECRET_KEY")  # noqa

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_CONFIG = env.email_url("EMAIL_URL", default="smtp://user:password@localhost:25")
vars().update(EMAIL_CONFIG)

NO_REPLY_EMAIL = env("NO_REPLY_EMAIL")
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")

STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = []

CSRF_TRUSTED_ORIGINS: List[str] = env.list("CSRF_TRUSTED_ORIGINS")
CORS_ALLOWED_ORIGINS: List[str] = env.list("CORS_ALLOWED_ORIGINS")
CORS_ALLOWED_ORIGIN_REGEXES: List[str] = env.list("CORS_ALLOWED_ORIGIN_REGEXES")

CORS_ORIGIN_ALLOW_ALL = False
