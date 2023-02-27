FROM postgres:15.2-alpine3.17

RUN apt update -y && apt install -y --no-install-recommends postgresql-contrib
COPY ./docker-entrypoint-initdb.d /
