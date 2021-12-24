FROM postgres:14

RUN apt update -y && apt install -y --no-install-recommends postgresql-contrib
COPY ./docker-entrypoint-initdb.d /
