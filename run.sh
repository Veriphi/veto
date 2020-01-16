#!/usr/bin/env bash

VERSION_NUMBER=${VERSION_NUMBER:-latest}

./stop.sh

# Start docker container
docker run --init -d -p 80:8080 --name veto veto:${VERSION_NUMBER}
