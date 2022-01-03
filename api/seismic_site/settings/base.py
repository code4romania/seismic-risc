"""
Django settings for seismic_site project.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os

import environ
from django.utils.translation import gettext_lazy as _

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, True),
    ENVIRONMENT=(str, "dev"),
    ENABLE_DEBUG_TOOLBAR=(bool, True),
    LANGUAGE_CODE=(str, "en"),
    NO_REPLY_EMAIL=(str, "noreply@code4.ro"),
    DEFAULT_FROM_EMAIL=(str, "noreply@code4.ro"),
    HERE_MAPS_API_KEY=(str, ""),
    USE_S3=(bool, False),
    AWS_ACCESS_KEY_ID=(str, ""),
    AWS_SECRET_ACCESS_KEY=(str, ""),
    AWS_STORAGE_BUCKET_NAME=(str, ""),
    AWS_S3_REGION_NAME=(str, ""),
)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../..")

DEBUG = env("DEBUG")

ALLOWED_HOSTS = []
CORS_ORIGIN_ALLOW_ALL = False

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
    "taggit_serializer",
    "corsheaders",
    "ckeditor",
    "ckeditor_uploader",
    # project apps
    "buildings",
    "pages",
    "blog",
    # api documentation
    "drf_spectacular",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

SITE_ID = 1

ENABLE_DEBUG_TOOLBAR = env("ENABLE_DEBUG_TOOLBAR")

ROOT_URLCONF = "seismic_site.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "APP_DIRS": True,
        "DIRS": [os.path.join(BASE_DIR, "templates")],
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
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

if env("ENVIRONMENT") == "test":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": "/tmp/test.db",
        }
    }
else:
    DATABASES = {
        "default": env.db(),  # looks for the DATABASE_URL env var
    }

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},  # noqa
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = env("LANGUAGE_CODE")
TIME_ZONE = "Europe/Bucharest"
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ("ro", _("Romanian")),
    ("en", _("English")),
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

USE_S3 = env("USE_S3")
if USE_S3:
    # aws settings
    AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
    AWS_DEFAULT_ACL = "public-read"
    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = "media"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/"
    DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
    # s3 private media settings
    PRIVATE_MEDIA_LOCATION = "private"
    PRIVATE_FILE_STORAGE = "hub.storage_backends.PrivateMediaStorage"
    AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME")
    AWS_S3_SIGNATURE_VERSION = "s3v4"
else:
    PRIVATE_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "./public/media")

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)

CKEDITOR_UPLOAD_PATH = "uploads/"

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

TRIGRAM_SIMILARITY_THRESHOLD = 0.1

SPECTACULAR_SETTINGS = {
    "VERSION": "0.1.0",
    "SWAGGER_UI_SETTINGS": {"url": "/api/v1/schema"},
}

HERE_MAPS_API_KEY = env("HERE_MAPS_API_KEY")
HERE_MAPS = {"api_key": HERE_MAPS_API_KEY}

ACCEPTED_IMAGE_TYPES = {
    "jpeg": "JPEG",
    "jpg": "JPEG",
    "png": "PNG",
}
COUNTIES_SHORTNAME = {
    "Arad": "AR",
    "Arges": "AG",
    "Argeș": "AG",
    "Bacau": "BC",
    "Bacău": "BC",
    "Bihor": "BH",
    "Bistrita-Nasaud": "BN",
    "Bistrița-Năsăud": "BN",
    "Botosani": "BT",
    "Botoșani": "BT",
    "Brasov": "BV",
    "Brașov": "BV",
    "Brsila": "BR",
    "Brăila": "BR",
    "Bucharest": "B",
    "Bucuresti": "B",
    "București": "B",
    "Buzau": "BZ",
    "Buzău": "BZ",
    "Calarasi": "CL",
    "Caras-Severin": "CS",
    "Caraș-Severin": "CS",
    "Cluj": "CJ",
    "Constanta": "CT",
    "Constanța": "CT",
    "Covasna": "CV",
    "Călărași": "CL",
    "Dambovita": "DB",
    "Dolj": "DJ",
    "Dâmbovița": "DB",
    "Galati": "GL",
    "Galați": "GL",
    "Giurgiu": "GR",
    "Gorj": "GJ",
    "Harghita": "HR",
    "Hunedoara": "HD",
    "Ialomita": "IL",
    "Ialomița": "IL",
    "Iasi": "IS",
    "Iași": "IS",
    "Ilfov": "IF",
    "Maramures": "MM",
    "Maramureș": "MM",
    "Mehedinti": "MH",
    "Mehedinți": "MH",
    "Mures": "MS",
    "Mureș": "MS",
    "Neamt": "NT",
    "Neamț": "NT",
    "Olt": "OT",
    "Prahova": "PH",
    "Salaj": "SJ",
    "Satu Mare": "SM",
    "Sibiu": "SB",
    "Suceava": "SV",
    "Sălaj": "SJ",
    "Teleorman": "TR",
    "Timis": "TM",
    "Timiș": "TM",
    "Tulcea": "TL",
    "Valcea": "VL",
    "Vaslui": "VS",
    "Vrancea": "VN",
    "Vâlcea": "VL",
}

QUALITY_DEFINITIONS = {"JPEG": 85, "PNG": 80}
ALLOWED_IMAGES_LIMIT = 3
IMAGE_RESIZE = 400
