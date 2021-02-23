cd /root/seismic-risc
git pull
docker-compose build db api

make migrate

docker-compose down
docker-compose up -d db api
