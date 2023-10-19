help:                             ## Display a help message detailing commands and their purpose
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""

build-dev:                        ## builds the container with the development flag
	docker compose build
	docker compose up -d

build-prod:                       ## builds the container with the production flag
	docker compose -f docker-compose.prod.yml build \
		--build-arg $$(cat .env.prod | grep ENVIRONMENT) \
		--build-arg $$(cat .env.prod | grep REACT_APP_CAPTCHA_API_KEY) \
		--build-arg $$(cat .env.prod | grep REACT_APP_HERE_MAPS_API_KEY) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_SITE_URL) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_PORT) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_API_ENDPOINT)
	docker compose -f docker-compose.prod.yml up -d


build: build-dev                  ## shorthand for the build-dev command

superuser:                        ## creates a superuser for the API
	docker compose exec api ./manage.py createsuperuser

init-db: superuser                ## sets up the database and fixtures
	docker compose exec api ./manage.py loaddata statistics
	docker compose exec api ./manage.py loaddata proximal_utilities
	docker compose exec api ./manage.py loaddata work_performed
	docker compose exec api ./manage.py loaddata buildings

drop-db-dev:                      ## drops the containers and removes the database for the development environment
	docker compose down -v -t 60

drop-db-prod:                     ## drops the containers and removes the database for the production environment
	docker compose -f docker-compose.prod.yml down -v -t 60

drop-db: drop-db-dev drop-db-prod ## drops the containers and removes the database for both environments

redo-db: drop-db init-db          ## drops the database, then sets up the database and fixtures

## [UTILS]
requirements-build:               ## run pip compile and add requirements from the *.in files
	docker compose run --rm --no-deps --entrypoint "bash -c" api "cd /code && pip-compile --resolver=backtracking -o requirements.txt requirements.in && pip-compile --resolver=backtracking -o requirements-dev.txt requirements-dev.in"

requirements-update:              ## run pip compile and rebuild the requirements files
	docker compose run --rm --no-deps --entrypoint "bash -c" api "cd /code && pip-compile --resolver=backtracking -r -U -o requirements.txt requirements.in && pip-compile --resolver=backtracking -r -U -o requirements-dev.txt requirements-dev.in && chmod a+r requirements.txt && chmod a+r requirements-dev.txt"

migrations:                       ## generate migrations in a clean container
	docker compose exec api ./manage.py makemigrations

migrate:                          ## apply migrations in a clean container
	docker compose exec api ./manage.py migrate

makemessages:                     ## generate the strings marked for translation
	docker compose exec api ./manage.py makemessages -a

compilemessages:                  ## compile the translations
	docker compose exec api ./manage.py compilemessages

messages: makemessages compilemessages

collectstatic:
	docker compose exec api ./manage.py collectstatic --no-input

pyshell:                          ## start a django shell
	docker compose exec api ./manage.py shell

black:                            ## run the Black formatter on the Python code
	black --line-length 120 --target-version py311 --exclude migrations ./api

## [TEST]
test:                             ## run all tests
	docker compose run --rm api "pytest"

test-pdb:                         ## run tests and enter debugger on failed assert or error
	docker compose run --rm api "pytest --pdb"

test-lf:                          ## rerun tests that failed last time
	docker compose run --rm api "pytest --lf"

## [CLEAN]
clean: clean-docker clean-py      ## remove all build, test, coverage and Python artifacts

clean-docker:                     ## stop docker containers and remove orphaned images and volumes
	docker compose down -t 60
	docker system prune -f

clean-py:                         ## remove Python test, coverage, file artifacts, and compiled message files
	find ./api -name '.coverage' -delete
	find ./api -name '.pytest_cache' -delete
	find ./api -name '__pycache__' -delete
	find ./api -name 'htmlcov' -delete
	find ./api -name '*.pyc' -delete
	find ./api -name '*.pyo' -delete
	find ./api -name '*.mo' -delete
