"""
Django settings for the project.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
from typing import Any, Dict, List

import environ
from django.utils.translation import gettext_lazy as _

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False),
    ENVIRONMENT=(str, "production"),
    ENABLE_DEBUG_TOOLBAR=(bool, False),
    LANGUAGE_CODE=(str, "en"),
    NO_REPLY_EMAIL=(str, "noreply@code4.ro"),
    DEFAULT_FROM_EMAIL=(str, "noreply@code4.ro"),
    HERE_MAPS_API_KEY=(str, ""),
    DATA_UPLOAD_MAX_NUMBER_FIELDS=(int, 1000),
    # hosts and origins
    ALLOWED_HOSTS=(list, []),
    CSRF_TRUSTED_ORIGINS=(list, []),
    CORS_ALLOWED_ORIGINS=(list, []),
    CORS_ALLOWED_ORIGIN_REGEXES=(list, []),
    # aws settings
    USE_S3=(bool, False),
    AWS_ACCESS_KEY_ID=(str, ""),
    AWS_SECRET_ACCESS_KEY=(str, ""),
    AWS_STORAGE_BUCKET_NAME=(str, ""),
    AWS_SUBDOMAIN=(str, "s3.amazonaws.com"),
    AWS_S3_REGION_NAME=(str, ""),
    BACKGROUND_WORKERS=(int, 1),
)

DATA_UPLOAD_MAX_NUMBER_FIELDS = env.int("DATA_UPLOAD_MAX_NUMBER_FIELDS")

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../..")

DEBUG = TEMPLATE_DEBUG = env("DEBUG")

ALLOWED_HOSTS: List[str] = env.list("ALLOWED_HOSTS")
CORS_ORIGIN_ALLOW_ALL = False

CSRF_TRUSTED_ORIGINS: List[str] = env.list("CSRF_TRUSTED_ORIGINS")

INSTALLED_APPS = [
    "jazzmin",
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
    "corsheaders",
    "django_q",
    # project apps
    "utils",
    "buildings",
    "static_custom",
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

ENABLE_DEBUG_TOOLBAR = env.bool("ENABLE_DEBUG_TOOLBAR")

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
            "NAME": "/tmp/test.db",  # noqa
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

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "seismic_cache_table",
        "TIMEOUT": 60 * 60 * 24,  # 24 hours
    },
    "memory": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "unique-snowflake",
        "TIMEOUT": 60 * 5,  # 5 minutes
    },
}

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

USE_S3 = (
    env.bool("USE_S3") and env("AWS_ACCESS_KEY_ID") and env("AWS_SECRET_ACCESS_KEY") and env("AWS_STORAGE_BUCKET_NAME")
)

if USE_S3:
    # aws settings
    AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")

    AWS_SUBDOMAIN = env("AWS_SUBDOMAIN")

    AWS_DEFAULT_ACL = None
    AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME")
    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.{AWS_SUBDOMAIN}"
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    AWS_S3_FILE_OVERWRITE = True

    DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = "media"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/"

    # s3 private media settings
    PRIVATE_MEDIA_LOCATION = "private"
else:
    PRIVATE_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "./public/media")

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions
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
    "Braila": "BR",
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

DEFAULT_PEOPLE_UNDER_RISK: int = 14245

# django-jazzmin
# -------------------------------------------------------------------------------
# django-jazzmin - https://django-jazzmin.readthedocs.io/configuration/

JAZZMIN_SETTINGS: Dict[str, Any] = {
    # title of the window
    "site_title": _("Acasă în Siguranță"),
    # Title on the brand, and the login screen (19 chars max)
    "site_header": _("Acasă în Siguranță"),
    # square logo to use for your site, must be present in static files, used for favicon and brand on top left
    "site_logo": "jazzmin/img/logomark-app.svg",
    "site_logo_short": "jazzmin/img/logomark-app.svg",
    "site_icon": "jazzmin/img/logomark-app.svg",
    # "site_logo_classes": "site-logo",
    # Welcome text on the login screen
    "welcome_sign": "",
    # Copyright on the footer
    "copyright": "Commit Global",
    # The model admin to search from the search bar, search bar omitted if excluded
    # "search_model": "donors.Donor",
    # The field name on the user model that contains avatar image
    "user_avatar": None,
    ############
    # Top Menu #
    ############
    # Links to put along the top menu
    "topmenu_links": [
        # Url that gets reversed (Permissions can be added)
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
    ],
    #############
    # User Menu #
    #############
    # Additional links to include in the user menu on the top right (the "app" url type is not allowed)
    "usermenu_links": [
        {"model": "auth.user", "new_window": False},
    ],
    #############
    # Side Menu #
    #############
    # Whether to display the side menu
    "show_sidebar": True,
    # Whether to auto expand the menu
    "navigation_expanded": True,
    # Hide these apps when generating the side menu e.g (auth)
    "hide_apps": ["pages", "sites"],
    # Hide these models when generating side menu (e.g auth.user)
    "hide_models": [],
    # List of apps (and/or models) to the base side menu ordering off of (does not need to contain all apps/models)
    "order_with_respect_to": [
        "buildings",
        "buildings.building",
        "buildings.buildingworkperformed",
        "buildings.buildingproximalutilities",
        "buildings.imagefile",
        "buildings.datafile",
        "buildings.statistic",
        "auth",
        "auth.user",
        "auth.group",
    ],
    # Custom icons for side menu apps/models
    # See https://fontawesome.com/v5/search?m=free
    # for a list of icon classes
    "icons": {
        "buildings.building": "fas fa-house-damage",
        "buildings.buildingworkperformed": "fas fa-tools",
        "buildings.buildingproximalutilities": "fas fa-city",
        "buildings.imagefile": "fas fa-images",
        "buildings.datafile": "fas fa-database",
        "buildings.statistic": "fas fa-table",
        "auth.group": "fas fa-users",
        "auth.user": "fas fa-user",
    },
    # Icons that are used when one is not manually specified
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    #################
    # Related Modal #
    #################
    # Use modals instead of popups
    "related_modal_active": False,
    #############
    # UI Tweaks #
    #############
    # Relative paths to custom CSS/JS scripts (must be present in static files)
    "custom_css": "jazzmin/css/admin.css",
    "custom_js": "",
    # Whether to show the UI customizer on the sidebar
    "show_ui_builder": DEBUG,
    ###############
    # Change view #
    ###############
    # Render out the change view as a single form, or in tabs, current options are
    # - single
    # - horizontal_tabs (default)
    # - vertical_tabs
    # - collapsible
    # - carousel
    "changeform_format": "single",
    # override change forms on a per modeladmin basis
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs",
    },
    # Add a language dropdown into the admin
    "language_chooser": True,
}

if DEBUG:
    JAZZMIN_SETTINGS["usermenu_links"].extend(
        [
            {
                "name": "Configuration",
                "url": "https://django-jazzmin.readthedocs.io/configuration/",
                "new_window": True,
                "icon": "fas fa-wrench",
            },
            {
                "name": "Support",
                "url": "https://github.com/farridav/django-jazzmin/issues",
                "new_window": True,
                "icon": "fas fa-question",
            },
        ]
    )

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": False,
    "accent": "accent-danger",
    "navbar": "navbar-white navbar-light",
    "no_navbar_border": False,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-dark-danger",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "default",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-outline-primary",
        "secondary": "btn-outline-secondary",
        "info": "btn-outline-info",
        "warning": "btn-outline-warning",
        "danger": "btn-outline-danger",
        "success": "btn-outline-success",
    },
}


# Django Q2
# https://django-q2.readthedocs.io/en/stable/brokers.html

Q_CLUSTER = {
    "name": "seismic",
    "workers": env.int("BACKGROUND_WORKERS"),
    "recycle": 100,
    "timeout": 900,  # A task must finish in less than 15 minutes
    "retry": 1200,  # Retry an unfinished tasks after 20 minutes
    "ack_failures": True,
    "max_attempts": 2,
    "compress": True,
    "save_limit": 200,
    "queue_limit": 4,
    "cpu_affinity": 1,
    "label": "Django Q2",
    "orm": "default",
    "poll": 2,
    "guard_cycle": 3,
    "catch_up": False,
}
