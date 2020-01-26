#!/usr/bin/env bash

START_SCREEN=${START_SCREEN:-false}
SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-false}
VERSION_NUMBER=${VERSION_NUMBER:-latest}

bash stop.sh

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

if [[ "${START_SCREEN}" -eq "true" ]]; then
  echo 'Removing old Veto screen instance...'
  docker stop veto-screen
  docker rm veto-screen

  echo 'Starting Veto screen...' && \
  docker run --init -it --name veto-screen veto-screen:${VERSION_NUMBER}
fi
