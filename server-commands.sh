#!/usr/bin/env bash 

echo "starting server"
export IMAGE=$1
docker-compose -f docker-compose.prod.yml down --volumes --remove-orphans 
docker-compose -f docker-compose.prod.yml up --detach   --remove-orphans 
echo "success"