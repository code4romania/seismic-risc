"""
Django settings for seismic_site project.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

from configurations import Configuration, values

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Base(Configuration):
    """
    For more info about the `django-configurations` library, see
    https://django-configurations.readthedocs.io/en/latest/
    """

    DEBUG = False

    SECRET_KEY = values.Value()

    ALLOWED_HOSTS = []
    SITE_URL = values.Value()
    SITE_ID = 1

    INSTALLED_APPS = [
        # django apps
        "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.contenttypes",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
        "django.contrib.sites",
        "django.contrib.sitemaps",
        "django.contrib.humanize",
        "django.contrib.postgres",
        # third-party apps
        "rest_framework",
        "storages",
        "taggit",
        "ckeditor",
        "ckeditor_uploader",
        # project apps
        "buildings",
        "pages",
        "blog",
    ]

    MIDDLEWARE = [
        "django.middleware.security.SecurityMiddleware",
        "whitenoise.middleware.WhiteNoiseMiddleware",
        "django.contrib.sessions.middleware.SessionMiddleware",
        "django.middleware.common.CommonMiddleware",
        "django.middleware.csrf.CsrfViewMiddleware",
        "django.contrib.auth.middleware.AuthenticationMiddleware",
        "django.contrib.messages.middleware.MessageMiddleware",
        "django.middleware.clickjacking.XFrameOptionsMiddleware",
    ]

    ROOT_URLCONF = "seismic_site.urls"

    TEMPLATES = [
        {
            "BACKEND": "django.template.backends.django.DjangoTemplates",
            "APP_DIRS": True,
            "OPTIONS": {
                "context_processors": [
                    "django.template.context_processors.debug",
                    "django.template.context_processors.request",
                    "django.contrib.auth.context_processors.auth",
                    "django.contrib.messages.context_processors.messages",
                ]
            },
        }
    ]

    WSGI_APPLICATION = "seismic_site.wsgi.application"

    # Database
    # https://docs.djangoproject.com/en/2.2/ref/settings/#databases

    DATABASES = values.DatabaseURLValue()

    # Password validation
    # https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = [
        {
            "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"  # noqa
        },
        {
            "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"  # noqa
        },
        {
            "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"  # noqa
        },
        {
            "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"  # noqa
        },
    ]

    # Internationalization
    # https://docs.djangoproject.com/en/2.2/topics/i18n/

    LANGUAGE_CODE = values.Value(default="en-us")
    TIME_ZONE = "UTC"
    USE_I18N = True
    USE_L10N = True
    USE_TZ = True

    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/2.2/howto/static-files/

    STATIC_URL = "/static/"
    STATIC_ROOT = os.path.join(BASE_DIR, "./public/static")
    # STATICFILES_DIRS = (
    #     os.path.join(BASE_DIR, 'static'),
    # )
    STATICFILES_STORAGE = (
        "whitenoise.storage.CompressedManifestStaticFilesStorage"
    )

    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "./public/media")

    CKEDITOR_UPLOAD_PATH = "uploads/"

    REST_FRAMEWORK = {
        # Use Django's standard `django.contrib.auth` permissions,
        # or allow read-only access for unauthenticated users.
        "DEFAULT_PERMISSION_CLASSES": [
            "rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"
        ]
    }

    TRIGRAM_SIMILARITY_THRESHOLD = 0.1


class Dev(Base):
    DEBUG = True
    SECRET_KEY = "secret"
    SITE_URL = "http://localhost:8000"
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


class Test(Base):
    DEBUG = True
    SECRET_KEY = "secret"
    SITE_URL = "http://localhost"
    EMAIL_BACKEND = "django.core.mail.backends.dummy.EmailBackend"
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": "/tmp/test.db",
        }
    }


class Prod(Base):
    DEBUG = False
    ALLOWED_HOSTS = values.ListValue(default=[".code4.ro"])

    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_USE_TLS = True
    EMAIL_HOST = values.Value(default="smtp.gmail.com")
    EMAIL_PORT = 587
    EMAIL_HOST_USER = values.Value()
    EMAIL_HOST_PASSWORD = values.Value()

    DEFAULT_FROM_EMAIL = values.EmailValue(default="noreply@code4.ro")
