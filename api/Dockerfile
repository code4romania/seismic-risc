FROM python:3.7-slim

ARG DEVBUILD

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
                    build-essential \
                    postgresql-client \
                    libpq-dev \
                    gettext

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# The dev requirements should be installed only if a DEVBUILD variable is
# passed to the docker build command. This should allow easy building of
# the production container image.
COPY requirements-dev.txt /requirements-dev.txt
RUN if [ "x$DEVBUILD" != "x" ]; then pip install -r /requirements-dev.txt; fi

WORKDIR /code
COPY . /code

ENTRYPOINT ["bash", "-c"]

CMD ["./start_gunicorn.sh"]
