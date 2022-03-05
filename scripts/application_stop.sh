#!/bin/bash

DIR="/home/ubuntu/API"
FILE="/home/ubuntu/API/docker-compose.yaml"

if [ -d "$DIR" ] && [ -f "$FILE" ]; then {
    echo "Stopping the containers"
    cd $DIR && sudo docker-compose down
}
    
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi

