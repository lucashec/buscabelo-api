#!/bin/bash

DIR="/home/ubuntu/API"

if [ -d "$DIR" ]; then
    echo "Stopping the containers"
    cd ../ && sudo docker-compose down
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi

