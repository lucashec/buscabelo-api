#!/bin/bash

CONTAINER_NAME='buscabelo-api'

CID=$(docker ps -q -f status=running -f name=^/${CONTAINER_NAME}$)
if [ ! "${CID}" ]; then
  echo "Container doesn't exist"
else sudo docker-compose down
fi

unset CID