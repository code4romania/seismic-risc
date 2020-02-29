for ((i = 0; i <30; i++)); do docker ps &> /dev/null && break || echo "Docker is not open yet. Retrying in 1 second..."; sleep 1; done
