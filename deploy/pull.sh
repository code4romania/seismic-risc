set -e

cd /root/seismic-risc
git reset --hard HEAD
git pull

docker-compose build --build-arg ENVIRONMENT=production api
docker-compose up -d db api
