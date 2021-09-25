set -e

cd /root/seismic-risc
git reset --hard HEAD
git pull

docker-compose build db api

docker-compose run --rm api "./manage.py migrate"
docker-compose run --rm api "./manage.py compilemessages"

docker-compose down
docker-compose up -d db api
