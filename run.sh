#!/usr/bin/env bash

VERSION_NUMBER=${VERSION_NUMBER:-latest}

./stop.sh

if [[ -f ./cyphernode/start.sh ]]; then
  echo 'Cyphernode start script found. Starting cyphernode...'
  ./cyphernode/start.sh
else
  echo 'No cyphernode start script found. Skiping...'
fi

# Start docker container
echo 'Starting Veto'
docker run --init -d -p 80:8080 --name veto veto:${VERSION_NUMBER}

echo 'Veto is now running, it is available at http://localhost'
