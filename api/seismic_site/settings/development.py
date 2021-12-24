from seismic_site.settings.base import *

DEBUG = True
ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True
SECRET_KEY = "secret"
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

INSTALLED_APPS = ["whitenoise.runserver_nostatic"] + INSTALLED_APPS

if DEBUG and env("ENABLE_DEBUG_TOOLBAR"):
    INSTALLED_APPS += ["debug_toolbar", "django_extensions"]
    MIDDLEWARE.insert(1, "debug_toolbar.middleware.DebugToolbarMiddleware")

    def show_toolbar(_):
        return True

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": show_toolbar,
    }

CACHES = {
    "default": {"BACKEND": "django.core.cache.backends.dummy.DummyCache"},
}

if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, "static")
    STATICFILES_DIRS = []
