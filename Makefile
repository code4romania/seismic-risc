help:                             ## Display a help message detailing commands and their purpose
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""

## [DEV ENV SETUP]
install-docker-ubuntu:            ## installs docker and docker-compose on Ubuntu
	sudo apt-get remove docker docker-engine docker.io containerd runc
	sudo apt-get update
	sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
	sudo apt-key fingerprint 0EBFCD88
	sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(shell lsb_release -cs) stable" || { echo "$(shell lsb_release -cs) is not yet supported by docker.com."; exit 1; }
	sudo apt-get update
	sudo apt-get install -y docker-ce gettext
	sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(shell uname -s)-$(shell uname -m)" -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose

install-docker-osx:               ## installs homebrew (you can skip this at runtime), docker and docker-compose on OSX
	/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	brew update
	brew cask install docker
	brew install docker-compose gettext

init-env:                         ## builds the container, sets up the database and fixtures
	cp .env.dist .env
	make build-dev
	make init-db

build:                            ## builds the container
	docker-compose build --pull

build-dev:                        ## builds the container with the DEVBUILD flag
	docker-compose build --build-arg DEVBUILD=1 --pull

init-db:                          ## sets up the database and fixtures
	docker-compose down -t 60
	docker-compose run --rm api "./wait_for_db.py && ./manage.py migrate --no-input"
	docker-compose run --rm api "./manage.py createsuperuser"
	docker-compose run --rm api "./manage.py loaddata buildings"
	docker-compose run --rm api "./manage.py loaddata pages"

drop-db:                          ## drops the database
	docker-compose down -t 60
	docker volume rm seismic-risc_pgdata

redo-db: drop-db init-db          ## drops the database, then sets up the database and fixtures

## [UTILS]
requirements-build:               ## run pip compile and add requirements from the *.in files
	docker-compose run --rm --no-deps --entrypoint "bash -c" api "cd /code && pip-compile -o requirements-dev.txt requirements-dev.in requirements.in && pip-compile -o requirements.txt requirements.in"

requirements-update:              ## run pip compile and rebuild the requirements files
	docker-compose run --rm --no-deps --entrypoint "bash -c" api "cd /code && pip-compile -r -U -o requirements-dev.txt requirements-dev.in requirements.in && pip-compile -r -U -o requirements.txt requirements.in && chmod a+r requirements.txt && chmod a+r requirements-dev.txt"

migrations:                       ## generate migrations in a clean container
	docker-compose run --rm api "./wait_for_db.py && ./manage.py makemigrations && ./manage.py migrate"

migrate:                          ## apply migrations in a clean container
	docker-compose run --rm api "./manage.py migrate"

makemessages:                     ## generate the strings marked for translation
	docker-compose exec api python manage.py makemessages -a

compilemessages:                  ## compile the translations
	docker-compose exec api python manage.py compilemessages

pyshell:                          ## start a django shell
	docker-compose run --rm api "./manage.py shell"

black:                            ## run the Black formatter on the Python code
	docker-compose run --rm api "black --line-length 120 --target-version py37 --exclude migrations ."

## [TEST]
test:                             ## run all tests
	docker-compose run --rm api "pytest"

test-pdb:                         ## run tests and enter debugger on failed assert or error
	docker-compose run --rm api "pytest --pdb"

test-lf:                          ## rerun tests that failed last time
	docker-compose run --rm api "pytest --lf"

## [CLEAN]
clean: clean-docker clean-py      ## remove all build, test, coverage and Python artifacts

clean-docker:                     ## stop docker containers and remove orphaned images and volumes
	docker-compose down -t 60
	docker system prune -f

clean-py:                         ## remove test, coverage and Python file artifacts
	find . -name '*.pyc' -delete
	find . -name '*.pyo' -delete
	find . -name '.coverage' -delete
	find . -name '.pytest_cache' -delete
	find . -name '__pycache__' -delete
	find . -name 'htmlcov' -delete
