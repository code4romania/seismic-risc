#!/bin/bash -eux

./manage.py collectstatic --no-input

gunicorn -b :"${GUNICORN_PORT}" -w "${GUNICORN_WORKERS_COUNT}" seismic_site.wsgi:application
