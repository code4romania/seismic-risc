FROM python:3.10.7-slim

ARG ENVIRONMENT

ENV ENVIRONMENT ${ENVIRONMENT:-production}
ENV DJANGO_SETTINGS_MODULE seismic_site.settings.${ENVIRONMENT}
ENV DOCKERIZE_VERSION v0.6.1

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        postgresql-client \
        libpq-dev \
        gettext \
        wget

# install dockerize and update pip
RUN wget https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz && \
    rm dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz && \
    chown root:root /usr/local/bin/dockerize && \
    pip install pip -U

# install and cache app dependencies
WORKDIR /opt/

COPY ./requirements*.txt ./
RUN if [ "${ENVIRONMENT}" = "production" ]; then pip install -r requirements.txt; else pip install -r requirements-dev.txt; fi

WORKDIR /code/

COPY ./docker-entrypoint /
COPY ./ /code/

ENTRYPOINT ["/docker-entrypoint"]
EXPOSE 8030
