#!/usr/bin/env bash 

echo "starting server"
docker-compose -f docker-compose.prod.yml down --volumes --remove-orphans 
docker-compose -f docker-compose.prod.yml up --detach   --remove-orphans 
echo "success"