import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "seismic_site.settings")
os.environ.setdefault("DJANGO_CONFIGURATION", "Prod")

from configurations.wsgi import get_wsgi_application  # noqa

application = get_wsgi_application()
