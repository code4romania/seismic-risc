help:                             ## Display a help message detailing commands and their purpose
	@echo "Commands:"
	@grep -E '^([a-zA-Z_-]+:.*?## .*|#+ (.*))$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""


## [Managing the project]
### Stopping the containers and dropping the databases
stop-dev:                         ## stops the dev project
	docker compose down -t 60

drop-dev:                         ## stops the dev project
	docker compose down -v -t 60

stop-prod:                        ## stops the dev project
	docker compose -f docker-compose.prod.yml down -t 60

drop-prod:                        ## stops the dev project
	docker compose -f docker-compose.prod.yml down -v -t 60

### Building & starting the containers
up-dev:                           ## run the project
	docker compose up --build

upd-dev:                          ## run the project in detached mode
	docker compose up -d --build

build-prod:
	docker compose -f docker-compose.prod.yml build \
		--build-arg $$(cat .env.prod | grep ENVIRONMENT) \
		--build-arg $$(cat .env.prod | grep REACT_APP_CAPTCHA_API_KEY) \
		--build-arg $$(cat .env.prod | grep REACT_APP_HERE_MAPS_API_KEY) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_SITE_URL) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_PORT) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_API_ENDPOINT)


up-prod:                          ## run the project
	docker compose -f docker-compose.prod.yml up

upd-prod:                       ## builds the container with the production flag
	docker compose -f docker-compose.prod.yml up -d

### Using the dev setup
run-dev: up-dev                   ## run the project
rund-dev: upd-dev                 ## run the project in detached mode
redo-dev: drop-dev up-dev         ## delete the db and rerun the project
redod-dev: drop-dev upd-dev       ## delete the db and rerun the project in detached mode

### With an image built for production
run-prod: build-prod up-prod               ## run the project with production settings
rund-prod: build-prod upd-prod             ## run the project with production settings in detached mode
redo-prod: drop-prod build-prod up-prod    ## delete the db and rerun the project
redod-prod: drop-prod build-prod upd-prod  ## delete the db and rerun the project in detached mode

### Other run options
run: run-dev                      ## set the default run command to dev
redo: redo-dev                    ## set the default redo command to dev
rund: rund-dev                    ## set the default run command to dev
redod: redod-dev                  ## set the default redo command to dev

stop: stop-dev stop-prod ## stop all running projects

drop: drop-dev drop-prod ## drop all databases


## [Monitoring the containers]
logs-dev:                         ## show the logs of the containers
	docker compose logs -f api

logs: logs-dev                    ## set the default logs command to dev

logs-prod:                        ## show the logs of the containers
	docker compose -f docker-compose.prod.yml logs -f api


## [Django operations]
makemigrations:                   ## generate migrations in a clean container
	docker compose exec api sh -c "python3 -Wd ./manage.py makemigrations $(apps)"

migrate:                          ## apply migrations in a clean container
	docker compose exec api sh -c "python3 -Wd ./manage.py migrate $(apps)"

migrations: makemigrations migrate ## generate and apply migrations


makemessages:                     ## generate the strings marked for translation
	docker compose exec api sh -c "python3 -Wd ./manage.py makemessages -a"

compilemessages:                  ## compile the translations
	docker compose exec api sh -c "python3 -Wd ./manage.py compilemessages"

messages: makemessages compilemessages ## generate and compile the translations


collectstatic:                    ## collect the static files
	docker compose exec api sh -c "python3 -Wd ./manage.py collectstatic --no-input"

format:                           ## format the code with black & ruff
	docker compose exec api sh -c "black ./api && ruff check --fix ./api"

pyshell:                          ## start a django shell
	docker compose exec -it api sh -c "python3 -Wd ./manage.py shell"

sh:                               ## start a sh shell
	docker compose exec -it api sh -c "sh"

bash:                             ## start a bash shell
	docker compose exec -it api sh -c "bash"


## [Requirements management]
requirements-build:               ## run pip compile and add requirements from the *.in files
	docker compose exec api sh -c " \
		pip-compile --strip-extras --resolver=backtracking -o requirements.txt requirements.in && \
		pip-compile --strip-extras --resolver=backtracking -o requirements-dev.txt requirements-dev.in \
	"

requirements-update:              ## run pip compile and rebuild the requirements files
	docker compose exec api sh -c " \
		pip-compile --strip-extras --resolver=backtracking -r -U -o requirements.txt requirements.in && \
		pip-compile --strip-extras --resolver=backtracking -r -U -o requirements-dev.txt requirements-dev.in && \
		chmod a+r requirements.txt && \
		chmod a+r requirements-dev.txt \
	"


## [Clean-up]
clean-docker:                     ## stop docker containers and remove orphaned images and volumes
	docker compose down -v -t 60
	docker compose -f docker-compose.prod.yml down -v -t 60
	docker system prune -f

clean-py:                         ## remove Python test, coverage, file artifacts, and compiled message files
	find ./backend -name '*.mo' -delete
	find ./backend -name '*.pyc' -delete
	find ./backend -name '*.pyo' -delete
	find ./backend -name '.coverage' -delete
	find ./backend -name '.pytest_cache' -delete
	find ./backend -name '.ruff_cache' -delete
	find ./backend -name '__pycache__' -delete
	find ./backend -name 'htmlcov' -delete

clean: clean-docker clean-py      ## remove all build, test, coverage and Python artifacts
