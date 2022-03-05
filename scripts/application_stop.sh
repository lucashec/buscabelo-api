#!/bin/bash

FILE="/home/ubuntu/API/docker-compose.yaml"

if [ -f "$FILE" ]; then {
    echo "Stopping the containers"
    sudo docker-compose down
}    
else
    echo "No containers found"
fi

