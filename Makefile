help:                             ## Display a help message detailing commands and their purpose
	@echo "Commands:"
	@grep -E '^([a-zA-Z_-]+:.*?## .*|#+ (.*))$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""


## [Managing the project]
### Stopping the containers and dropping the databases
stop-sqlite:                      ## stops the sqlite dev project
	$(error SQLite is not supported)

drop-sqlite:                      ## stops the sqlite dev project
	$(error SQLite is not supported)

stop-mysql:                       ## stops the mysql dev project
	$(error MySQL is not supported)

drop-mysql:                       ## stops the mysql dev project
	$(error MySQL is not supported)

stop-psql:                       ## stops the psql dev project
	docker compose down -t 60

drop-psql:                       ## stops the psql dev project
	docker compose down -v -t 60

stop-prod:                        ## stops the mysql dev project
	docker compose -f docker-compose.prod.yml down -t 60

drop-prod:                        ## stops the mysql dev project
	docker compose -f docker-compose.prod.yml down -v -t 60

### Building & starting the containers
up-sqlite:                        ## run the project with sqlite
	$(error SQLite is not supported)

upd-sqlite:                       ## run the project with sqlite in detached mode
	$(error SQLite is not supported)

up-mysql:                         ## run the project with mysql
	$(error MySQL is not supported)

upd-mysql:                        ## run the project with mysql in detached mode
	$(error MySQL is not supported)

up-psql:                         ## run the project with psql
	docker compose up --build

upd-psql:                        ## run the project with psql in detached mode
	docker compose up -d --build

up-prod:                         ## run the project with mysql
	docker compose -f docker-compose.prod.yml up --build

upd-prod:                        ## run the project with mysql in detached mode
	docker compose -f docker-compose.prod.yml up -d --build

build-prod:
	docker compose -f docker-compose.prod.yml build \
		--build-arg $$(cat .env.prod | grep ENVIRONMENT) \
		--build-arg $$(cat .env.prod | grep REACT_APP_CAPTCHA_API_KEY) \
		--build-arg $$(cat .env.prod | grep REACT_APP_HERE_MAPS_API_KEY) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_SITE_URL) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_PORT) \
		--build-arg $$(cat .env.prod | grep REACT_APP_DJANGO_API_ENDPOINT)

### Using the SQLite database
run-sqlite:
	$(error SQLite is not supported)   ## run the project with sqlite and stop the mysql project beforehand
rund-sqlite:
	$(error SQLite is not supported) ## run the project with sqlite in detached mode and stop the mysql project beforehand
redo-sqlite:
	$(error SQLite is not supported)           ## delete the db and rerun the project with sqlite
redod-sqlite:
	$(error SQLite is not supported)         ## delete the db and rerun the project with sqlite in detached mode

### Using the MySQL database
run-mysql:
	$(error SQLite is not supported)    ## run the project with mysql and stop the sqlite project beforehand
rund-mysql:
	$(error SQLite is not supported)  ## run the project with mysql in detached mode and stop the sqlite project beforehand
redo-mysql:
	$(error SQLite is not supported)              ## delete the db and rerun the project with mysql
redod-mysql:
	$(error SQLite is not supported)            ## delete the db and rerun the project with mysql in detached mode

### Using the PostgreSQL database
run-psql: up-psql      ## run the project with psql and stop the mysql project beforehand
rund-psql: upd-psql    ## run the project with psql in detached mode and stop the mysql project beforehand
redo-psql: drop-psql up-psql                  ## delete the db and rerun the project with psql
redod-psql: drop-psql upd-psql                ## delete the db and rerun the project with psql in detached mode

### With an image built for production
run-prod: up-prod                 ## run the project with production settings
rund-prod: upd-prod               ## run the project with production settings in detached mode
redo-prod: drop-prod up-prod      ## delete the db and rerun the project with mysql
redod-prod: drop-prod upd-prod    ## delete the db and rerun the project with mysql in detached mode

### Other run options
run: run-psql                   ## set the default run command to sqlite
redo: redo-psql                 ## set the default redo command to sqlite
rund: rund-psql                 ## set the default run command to sqlite
redod: redod-psql               ## set the default redo command to sqlite

stop: stop-psql stop-prod ## stop all running projects

drop: drop-psql drop-prod ## drop all databases


## [Monitoring the containers]
logs-dev:                         ## show the logs of the containers
	docker logs -f seismic_dev

logs: logs-dev                    ## set the default logs command to dev

logs-prod:                        ## show the logs of the containers
	docker logs -f seismic_prod


## [Django operations]
makemigrations:                   ## generate migrations in a clean container
	docker exec seismic_backend_dev sh -c "python3 -Wd ./backend/manage.py makemigrations $(apps)"

migrate:                          ## apply migrations in a clean container
	docker exec seismic_backend_dev sh -c "python3 -Wd ./backend/manage.py migrate $(apps)"

migrations: makemigrations migrate ## generate and apply migrations

makemessages:                     ## generate the strings marked for translation
	docker exec seismic_backend_dev sh -c "python3 -Wd ./backend/manage.py makemessages -a"

compilemessages:                  ## compile the translations
	docker exec seismic_backend_dev sh -c "python3 -Wd ./backend/manage.py compilemessages"

messages: makemessages compilemessages ## generate and compile the translations

collectstatic:                    ## collect the static files
	docker exec seismic_backend_dev sh -c "python3 -Wd ./backend/manage.py collectstatic --no-input"

format:                           ## format the code with black & ruff
	docker exec seismic_backend_dev sh -c "black ./backend && ruff check --fix ./backend"

pyshell:                          ## start a django shell
	docker exec -it seismic_backend_dev sh -c "python3 -Wd ./backend/manage.py shell"

sh:                               ## start a sh shell
	docker exec -it seismic_backend_dev sh -c "sh"

bash:                             ## start a bash shell
	docker exec -it seismic_backend_dev sh -c "bash"


## [Requirements management]
requirements-build:               ## run pip compile and add requirements from the *.in files
	docker exec seismic_backend_dev sh -c " \
		pip-compile --strip-extras --resolver=backtracking -o requirements.txt requirements.in && \
		pip-compile --strip-extras --resolver=backtracking -o requirements-test.txt requirements-test.in && \
		pip-compile --strip-extras --resolver=backtracking -o requirements-dev.txt requirements-dev.in \
	"

requirements-update:              ## run pip compile and rebuild the requirements files
	docker exec seismic_backend_dev sh -c " \
		pip-compile --strip-extras --resolver=backtracking -r -U -o requirements.txt requirements.in && \
		pip-compile --strip-extras --resolver=backtracking -r -U -o requirements-test.txt requirements-test.in && \
		pip-compile --strip-extras --resolver=backtracking -r -U -o requirements-dev.txt requirements-dev.in && \
		chmod a+r requirements.txt && \
		chmod a+r requirements-test.txt && \
		chmod a+r requirements-dev.txt \
	"


## [Tests]
tests:                            ## run the tests
	docker exec seismic_backend_dev sh -c "cd ./backend && pytest -Wd $(apps)"

tests-cover:                      ## run the tests with coverage
	docker exec seismic_backend_dev sh -c "cd ./backend && pytest -Wd  --cov --cov-report=xml --cov-report=term-missing --cov-fail-under=60 $(apps)"


## [Clean-up]
clean-docker:                     ## stop docker containers and remove orphaned images and volumes
	docker compose down -t 60
	docker compose -f docker-compose.prod.yml down -t 60
	docker system prune -f

clean-extras:                        ## remove test, coverage, file artifacts, and compiled message files
	find ./backend -name '*.mo' -delete
	find ./backend -name '*.pyc' -delete
	find ./backend -name '*.pyo' -delete
	find ./backend -name '.coverage' -delete
	find ./backend -name '.pytest_cache' -delete
	find ./backend -name '.ruff_cache' -delete
	find ./backend -name '__pycache__' -delete
	find ./backend -name 'htmlcov' -delete

clean-db:                          ## remove the database files
	rm -rf ./backend/media ./backend/static ./frontend/dist

clean: clean-docker clean-extras clean-db  ## remove all build, test, coverage and Python artifacts


## [Project-specific operations]
mock-data:                        ## generate fake data
	docker exec seismic_backend_dev python3 -Wd ./backend/manage.py generate_editions 5
	docker exec seismic_backend_dev python3 -Wd ./backend/manage.py generate_users 20 --type U
	docker exec seismic_backend_dev python3 -Wd ./backend/manage.py generate_projects 40
	docker exec seismic_backend_dev python3 -Wd ./backend/manage.py generate_marketplace 10
	docker exec seismic_backend_dev python3 -Wd ./backend/manage.py generate_users 2 --type J
