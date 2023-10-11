FROM python:3.11.6-slim-bookworm

ENV PYTHONUNBUFFERED=1

ENV RUN_MIGRATION=yes
ENV RUN_COMPILE_MESSAGES=no
ENV RUN_COLLECT_STATIC=no
ENV RUN_CREATE_SUPER_USER=yes

ENV IS_CONTAINERIZED=True

ENV DEBIAN_FRONTEND=noninteractive


RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    nginx gcc xz-utils gettext build-essential postgresql-client libpq-dev


ARG S6_OVERLAY_VERSION=3.1.2.1
ENV S6_CMD_WAIT_FOR_SERVICES_MAXTIME 0

ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz /tmp
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-x86_64.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-noarch.tar.xz && \
    tar -C / -Jxpf /tmp/s6-overlay-x86_64.tar.xz


ENTRYPOINT ["/init"]

COPY docker/nginx/nginx.conf /etc/nginx/sites-available/default
COPY docker/s6-rc.d /etc/s6-overlay/s6-rc.d


# Python virtualenv paths
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"


# install the backend libraries:
COPY ./api/setup.cfg ./api/requirements.txt ./api/requirements-dev.txt /var/www/seismic/api/
WORKDIR /var/www/seismic/api/
RUN python3 -m pip install --upgrade pip setuptools && \
    python3 -m pip install -r ./requirements.txt


# copy the backend source code:
COPY ./api/ /var/www/seismic/api/


# Make sure scripts in .local are usable:
ENV PATH=/root/.local/bin:$PATH


WORKDIR /var/www/seismic/

EXPOSE 80
