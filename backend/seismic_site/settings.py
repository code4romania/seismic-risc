"""
Django settings for the project.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from copy import deepcopy
from pathlib import Path
from typing import Any, Dict, List

import environ
from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: BASE_DIR / 'subdir'.
ROOT = Path(__file__).resolve().parent.parent.parent
BASE_DIR = os.path.abspath(os.path.join(ROOT, "backend"))

ENV_FILE_NAME = os.environ.get("ENV_FILE_NAME", ".env.local")
ENV_FILE_PATH = os.path.join(BASE_DIR, os.pardir, ENV_FILE_NAME)

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False),
    ENVIRONMENT=(str, "production"),
    SECRET_KEY=(str, "secret-key"),
    LOG_LEVEL=(str, "INFO"),
    LANGUAGE_CODE=(str, "en"),
    HERE_MAPS_API_KEY=(str, ""),
    DATA_UPLOAD_MAX_NUMBER_FIELDS=(int, 1000),
    BACKGROUND_WORKERS_COUNT=(int, 1),
    IS_CONTAINERIZED=(bool, True),
    DJANGO_ADMIN_EMAIL=(str, ""),
    DJANGO_ADMIN_PASSWORD=(str, ""),
    # email settings
    EMAIL_SEND_METHOD=(str, "async"),
    EMAIL_BACKEND=(str, "django.core.mail.backends.console.EmailBackend"),
    EMAIL_HOST=(str, ""),
    EMAIL_PORT=(str, ""),
    EMAIL_HOST_USER=(str, ""),
    EMAIL_HOST_PASSWORD=(str, ""),
    EMAIL_USE_TLS=(str, ""),
    EMAIL_FAIL_SILENTLY=(bool, False),
    DEFAULT_FROM_EMAIL=(str, "no-reply@code4.ro"),
    NO_REPLY_EMAIL=(str, "no-reply@code4.ro"),
    # security settings
    ALLOWED_HOSTS=(list, ["*"]),
    CSRF_TRUSTED_ORIGINS=(list, []),
    CORS_ALLOW_ALL_ORIGINS=(bool, False),
    CORS_ALLOWED_ORIGINS=(list, []),
    CORS_ALLOWED_ORIGIN_REGEXES=(list, []),
    # aws settings
    AWS_REGION_NAME=(str, ""),
    # S3
    USE_S3=(bool, False),
    AWS_S3_REGION_NAME=(str, ""),
    AWS_S3_SIGNATURE_VERSION=(str, "s3v4"),
    AWS_S3_ADDRESSING_STYLE=(str, "virtual"),
    AWS_S3_STORAGE_DEFAULT_BUCKET_NAME=(str, ""),
    AWS_S3_STORAGE_PUBLIC_BUCKET_NAME=(str, ""),
    AWS_S3_STORAGE_STATIC_BUCKET_NAME=(str, ""),
    AWS_S3_DEFAULT_ACL=(str, "private"),
    AWS_S3_PUBLIC_ACL=(str, ""),
    AWS_S3_STATIC_ACL=(str, ""),
    AWS_S3_DEFAULT_PREFIX=(str, ""),
    AWS_S3_PUBLIC_PREFIX=(str, ""),
    AWS_S3_STATIC_PREFIX=(str, ""),
    AWS_S3_DEFAULT_CUSTOM_DOMAIN=(str, ""),
    AWS_S3_PUBLIC_CUSTOM_DOMAIN=(str, ""),
    AWS_S3_STATIC_CUSTOM_DOMAIN=(str, ""),
    # SES
    AWS_SES_REGION_NAME=(str, ""),
    AWS_SES_USE_V2=(bool, True),
    AWS_SES_CONFIGURATION_SET_NAME=(str, None),
    AWS_SES_AUTO_THROTTLE=(float, 0.5),
    AWS_SES_REGION_ENDPOINT=(str, ""),
)

environ.Env.read_env(ENV_FILE_PATH)

# SECURITY WARNING: don't run with debug turned on in production
DEBUG = TEMPLATE_DEBUG = env("DEBUG")
ENVIRONMENT = env.str("ENVIRONMENT")

# SECURITY WARNING: keep the secret key used in production secret
SECRET_KEY = env.str("SECRET_KEY")
if SECRET_KEY == "secret-key" and DEBUG is False:
    raise ValueError("SECRET_KEY must be set in production environment")

DATA_UPLOAD_MAX_NUMBER_FIELDS = env.int("DATA_UPLOAD_MAX_NUMBER_FIELDS")

# Proxy HOST & Scheme headers
USE_X_FORWARDED_HOST = env.bool("USE_PROXY_FORWARDED_HOST", False)
if proxy_ssl_header_name := env.str("PROXY_SSL_HEADER", ""):
    SECURE_PROXY_SSL_HEADER = (proxy_ssl_header_name, "https")


ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

CSRF_HEADER_NAME = "HTTP_X_XSRF_TOKEN"
CSRF_COOKIE_NAME = "XSRF-TOKEN"
CSRF_TRUSTED_ORIGINS: List[str] = env.list("CSRF_TRUSTED_ORIGINS")

CORS_ALLOW_ALL_ORIGINS: bool = env.bool("CORS_ALLOW_ALL_ORIGINS")
CORS_ALLOWED_ORIGINS: List[str] = env.list("CORS_ALLOWED_ORIGINS")
CORS_ALLOWED_ORIGIN_REGEXES: List[str] = env.list("CORS_ALLOWED_ORIGIN_REGEXES")


# Logging
DJANGO_LOG_LEVEL = env.str("LOG_LEVEL").upper()

# some settings will be different if it's not running in a container (e.g., locally, on a PC)
IS_CONTAINERIZED = BASE_DIR.startswith(os.path.join("/", "var", "www"))  # noqa

VERSION = env.str("VERSION", "edge")
REVISION = env.str("REVISION", "develop")

if IS_CONTAINERIZED and VERSION == "edge" and REVISION == "develop":
    version_file = os.path.join(BASE_DIR, ".version")  # noqa
    if os.path.exists(version_file):
        with open(version_file) as f:
            VERSION, REVISION = f.read().strip().split("+")

REVISION = REVISION[:7]

VERSION_SUFFIX = f"seismic@{VERSION}+{REVISION}"


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": DJANGO_LOG_LEVEL,
    },
}


# Application definition
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
    "whitenoise.runserver_nostatic",
    # project apps
    "utils",
    "buildings",
    "static_custom",
    "users",
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
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DATABASE_NAME"),
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "HOST": env("DATABASE_HOST"),
        "PORT": env("DATABASE_PORT"),
    }
}


# Cache
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


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


AUTH_USER_MODEL = "users.User"
DJANGO_ADMIN_EMAIL = env.str("DJANGO_ADMIN_EMAIL")
DJANGO_ADMIN_PASSWORD = env.str("DJANGO_ADMIN_PASSWORD")


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},  # noqa
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},  # noqa
]


# Email settings
EMAIL_BACKEND = env.str("EMAIL_BACKEND")
EMAIL_SEND_METHOD = env.str("EMAIL_SEND_METHOD")

DEFAULT_FROM_EMAIL = env.str("DEFAULT_FROM_EMAIL")
NO_REPLY_EMAIL = env.str("NO_REPLY_EMAIL")

EMAIL_HOST = env.str("EMAIL_HOST")
EMAIL_PORT = env.str("EMAIL_PORT")
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS")

EMAIL_FAIL_SILENTLY = env.bool("EMAIL_FAIL_SILENTLY")

if EMAIL_BACKEND == "django_ses.SESBackend":
    AWS_SES_CONFIGURATION_SET_NAME = env.str("AWS_SES_CONFIGURATION_SET_NAME")

    AWS_SES_AUTO_THROTTLE = env.float("AWS_SES_AUTO_THROTTLE", default=0.5)
    AWS_SES_REGION_NAME = env.str("AWS_SES_REGION_NAME") if env("AWS_SES_REGION_NAME") else env("AWS_REGION_NAME")
    AWS_SES_REGION_ENDPOINT = env.str("AWS_SES_REGION_ENDPOINT", default=f"email.{AWS_SES_REGION_NAME}.amazonaws.com")

    AWS_SES_FROM_EMAIL = DEFAULT_FROM_EMAIL

    USE_SES_V2 = env.bool("AWS_SES_USE_V2", default=True)

    if aws_access_key := env("AWS_ACCESS_KEY_ID", default=None):
        AWS_ACCESS_KEY_ID = aws_access_key
        AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
else:
    EMAIL_HOST = env.str("EMAIL_HOST")
    EMAIL_PORT = env.str("EMAIL_PORT")
    EMAIL_HOST_USER = env.str("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD")
    EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS")


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = env("LANGUAGE_CODE")
TIME_ZONE = "Europe/Bucharest"
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ("ro", _("Romanian")),
    ("en", _("English")),
]

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)


# Media & Static files storage
# https://docs.djangoproject.com/en/4.2/howto/static-files/

static_static_location = "static"
public_media_location = "media"
private_media_location = "media"

static_storage = "whitenoise.storage.CompressedStaticFilesStorage"
media_storage = "django.core.files.storage.FileSystemStorage"

STATIC_URL = f"{static_static_location}/"
MEDIA_URL = f"{public_media_location}/"

STATIC_ROOT = os.path.abspath(os.path.join(BASE_DIR, "static"))
MEDIA_ROOT = os.path.abspath(os.path.join(BASE_DIR, "media"))

STATICFILES_DIRS = []

default_storage_options = {}

public_storage_options = {}
static_storage_options = {}

if env.bool("USE_S3"):
    media_storage = "storages.backends.s3boto3.S3Boto3Storage"
    static_storage = "storages.backends.s3boto3.S3StaticStorage"

    # https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html
    default_storage_options = {
        "bucket_name": env.str("AWS_S3_STORAGE_DEFAULT_BUCKET_NAME"),
        "default_acl": env.str("AWS_S3_DEFAULT_ACL"),
        "region_name": env.str("AWS_S3_REGION_NAME") or env.str("AWS_REGION_NAME"),
        "object_parameters": {"CacheControl": "max-age=86400"},
        "file_overwrite": False,
        "signature_version": env.str("AWS_S3_SIGNATURE_VERSION"),
        "addressing_style": env.str("AWS_S3_ADDRESSING_STYLE"),
    }

    # Authentication, if not using IAM roles
    if aws_session_profile := env.str("AWS_S3_SESSION_PROFILE", default=None):
        default_storage_options["session_profile"] = aws_session_profile
    elif aws_access_key := env.str("AWS_ACCESS_KEY_ID", default=None):
        default_storage_options["access_key"] = aws_access_key
        default_storage_options["secret_key"] = env.str("AWS_SECRET_ACCESS_KEY")

    # Additional default configurations
    if default_prefix := env.str("AWS_S3_DEFAULT_PREFIX", default=None):
        default_storage_options["location"] = default_prefix
    if custom_domain := env.str("AWS_S3_DEFAULT_CUSTOM_DOMAIN", default=None):
        public_storage_options["custom_domain"] = custom_domain

    # Public storage options
    public_storage_options = deepcopy(default_storage_options)
    if public_acl := env.str("AWS_S3_PUBLIC_ACL"):
        public_storage_options["default_acl"] = public_acl
    if public_bucket_name := env.str("AWS_S3_STORAGE_PUBLIC_BUCKET_NAME"):
        public_storage_options["bucket_name"] = public_bucket_name
    if public_prefix := env.str("AWS_S3_PUBLIC_PREFIX", default=None):
        public_storage_options["location"] = public_prefix
    if custom_domain := env.str("AWS_S3_PUBLIC_CUSTOM_DOMAIN", default=None):
        public_storage_options["custom_domain"] = custom_domain

    static_storage_options = deepcopy(public_storage_options)
    if static_acl := env.str("AWS_S3_STATIC_ACL"):
        static_storage_options["default_acl"] = static_acl
    if static_bucket_name := env.str("AWS_S3_STORAGE_STATIC_BUCKET_NAME"):
        static_storage_options["bucket_name"] = static_bucket_name
    if static_prefix := env.str("AWS_S3_STATIC_PREFIX", default=None):
        static_storage_options["location"] = static_prefix
    if custom_domain := env.str("AWS_S3_STATIC_CUSTOM_DOMAIN", default=None):
        static_storage_options["custom_domain"] = custom_domain


STORAGES = {
    "default": {
        "BACKEND": media_storage,
        "LOCATION": private_media_location,
        "OPTIONS": default_storage_options,
    },
    "public": {
        "BACKEND": media_storage,
        "LOCATION": public_media_location,
        "OPTIONS": public_storage_options,
    },
    "staticfiles": {
        "BACKEND": static_storage,
        "LOCATION": static_static_location,
        "OPTIONS": static_storage_options,
    },
}


# API settings
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
    "copyright": f"Commit Global | {VERSION_SUFFIX}",
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
    "workers": env.int("BACKGROUND_WORKERS_COUNT"),
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
