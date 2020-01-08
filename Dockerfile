FROM python:3.7-slim

ARG DEVBUILD

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
                    build-essential \
                    postgresql-client \
                    libpq-dev \
                    gettext

RUN pip install pip -U

COPY . /code

RUN pip install -r /code/requirements.txt

# The dev requirements should be installed only if a DEVBUILD variable is
# passed to the docker build command. This should allow easy building of
# the production container image.
RUN if [ "x$DEVBUILD" != "x" ]; then pip install -r /code/requirements-dev.txt; fi

WORKDIR /code/seismic_site

ENTRYPOINT ["bash", "-c"]
