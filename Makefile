
help:
	@echo "[DEV ENV SETUP]"
	@echo "install-docker-ubuntu - installs docker and docker-compose on Ubuntu"
	@echo "install-docker-osx - installs homebrew (you can skip this at runtime), docker and docker-compose on OSX"
	@echo "init-env - builds the container, sets up the database and fixtures"
	@echo "build - builds the container"
	@echo "init-db - sets up the database and fixtures"
	@echo "drop-db - drops the database"
	@echo "redo-db - drops the database, then sets up the database and fixtures"

	@echo "\n[UTILS]"
	@echo "update-requirements - run pip compile and rebuild the requirements files"
	@echo "migrations - generate migrations in a clean container"
	@echo "shell - start a django shell"

	@echo "\n[TEST]"
	@echo "test - run all tests"
	@echo "test-pdb - run tests and enter debugger on failed assert or error"
	@echo "test-lf - rerun tests that failed last time"

	@echo "\n[CLEAN]"
	@echo "clean - remove all build, test, coverage and Python artifacts"
	@echo "clean-docker - stop docker containers and remove orphaned images and volumes"
	@echo "clean-py - remove test, coverage and Python file artifacts"

install-docker-ubuntu:
	sudo apt-get remove docker docker-engine docker.io containerd runc
	sudo apt-get update
	sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
	sudo apt-key fingerprint 0EBFCD88
	sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(shell lsb_release -cs) stable" || { echo "$(shell lsb_release -cs) is not yet supported by docker.com."; exit 1; }
	sudo apt-get update
	sudo apt-get install -y docker-ce
	sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(shell uname -s)-$(shell uname -m)" -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose

install-docker-osx:
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	brew update
	brew cask install docker
	brew install docker-compose

init-env:
	cp .env.dist .env
	make build
	make init-db

build:
	docker-compose build --pull

init-db:
	docker-compose down -t 60
	docker-compose run --rm api "./wait_for_db.py && ./manage.py migrate --no-input"
	docker-compose run --rm api "./manage.py createsuperuser"
	docker-compose run --rm api "./manage.py loaddata buildings"
	docker-compose run --rm api "./manage.py loaddata pages"

drop-db:
	docker-compose down -t 60
	docker volume rm seismic-risc_pgdata

redo-db: drop-db init-db

update-requirements:
	docker-compose build --pull api
	docker-compose run --rm api "cd /code && pip install pip-tools -U && pip-compile --upgrade requirements.in -o requirements.txt && chmod a+r requirements.txt"
	docker-compose run --rm api "cd /code && pip install pip-tools -U && pip-compile --upgrade requirements-dev.in -o requirements-dev.txt && chmod a+r requirements-dev.txt"

migrations:
	docker-compose build --pull api
	docker-compose run --rm api "./wait_for_db.py && ./manage.py makemigrations && ./manage.py migrate"

migrate:
	docker-compose run --rm api "./manage.py migrate"

pyshell:
	docker-compose run --rm api "./manage.py shell"

test:
	docker-compose build --pull api
	docker-compose run --rm api "pytest"

test-pdb:
	docker-compose run --rm api "pytest --pdb"

test-lf:
	docker-compose run --rm api "pytest --lf"

black:
	docker-compose run --rm api "black --line-length 80 --target-version py37 --exclude migrations ."

clean: clean-docker clean-py

clean-docker:
	docker-compose down -t 60
	docker system prune -f

clean-py:
	find . -name '*.pyc' -delete
	find . -name '*.pyo' -delete
	find . -name '.coverage' -delete
