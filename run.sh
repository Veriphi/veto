#!/usr/bin/env bash

SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-false}
VERSION_NUMBER=${VERSION_NUMBER:-latest}

./stop.sh

if [[ "${SKIP_CYPHERNODE}" -eq "true" ]]; then
  echo 'Skipping Cyphernode...'
elif [[ -f ./cyphernode/start.sh ]]; then
  echo 'Cyphernode start script found. Starting Cyphernode now...'
  ./cyphernode/start.sh
else
  echo 'No Cyphernode start script found. Skiping...'
fi

# Start docker container
echo 'Removing old Veto instance...'
docker rm veto
echo 'Starting Veto...'
docker run --init -d -p 80:8080 --name veto veto:${VERSION_NUMBER} && \
echo 'Veto is now running, it is available at http://localhost'
