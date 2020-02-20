#!/usr/bin/env bash

SKIP_VETO=${SKIP_VETO:-"false"}
START_SCREEN=${START_SCREEN:-false}
SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-false}
VERSION_NUMBER=${VERSION_NUMBER:-latest}
CURRENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

SKIP_CYPHERNODE="${SKIP_CYPHERNODE}" bash "${CURRENT_DIR}/stop.sh"

if [[ "${SKIP_CYPHERNODE}" == "true" ]]; then
  echo 'Skipping Cyphernode...'
elif [[ -f ./cyphernode/start.sh ]]; then
  echo 'Cyphernode start script found. Starting Cyphernode now...'
  cd cyphernode/
  ./start.sh
  cd ../
else
  echo 'No Cyphernode start script found. Skiping...'
fi

if [ "${SKIP_VETO}" == "true" ]; then
  echo 'Skip running Veto...'
else
  # Start docker container
  echo 'Removing old Veto instance...'
  docker rm veto >> /dev/null


  keyId='001'
  # Get the key that correspond to the keyId
  key=`cat ./cyphernode/keys.txt | grep "${keyId}=" | sed s/$keyId=//`
  # Get creds
  cert=`cat ./cyphernode/cacert.pem`


  echo 'Starting Veto...'
  docker run --init -d \
    -e="CYPHERNODE_KEY_ID=${keyId}" \
    -e="CYPHERNODE_KEY=${key}" \
    -e="CYPHERNODE_CERT=${cert}" \
    -p 8080:8080 \
    --name veto veto:${VERSION_NUMBER} && \
  echo 'Veto is now running, it is available at http://localhost'

  if [[ "${START_SCREEN}" == "true" ]]; then
    echo 'Removing old Veto screen instance...'
    docker stop veto-screen >> /dev/null
    docker rm veto-screen >> /dev/null

    echo 'Starting Veto screen...' && \
    docker run --init -it --name veto-screen veto-screen:${VERSION_NUMBER}
  fi
fi
