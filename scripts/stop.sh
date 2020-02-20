#!/usr/bin/env bash

SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-false}
VERSION_NUMBER=${VERSION_NUMBER:-latest}
CYPHERNODE_DIR=${CYPHERNODE_DIR:-./cyphernode}
ORIGINAL_DIR=$(pwd)

echo "Stopping everything..."

if [[ "${SKIP_CYPHERNODE}" == "true" ]]; then
  echo 'Skipping Cyphernode...'
elif [[ -f "${CYPHERNODE_DIR}/start.sh" ]]; then
  echo 'Cyphernode stop script found. Stopping Cyphernode now...'
  cd "${CYPHERNODE_DIR}" || exit
  ./stop.sh
  cd "${ORIGINAL_DIR}" || exit
  echo "Cyphernode stopped"
else
  echo "No Cyphernode stop script found at '${CYPHERNODE_DIR}/start.sh'. Skiping..."
fi

# Fetch running Veto instances
runningVetoInstances=$(docker ps | grep "veto" | awk '{ print $1 }');

if [[ ! ''$runningVetoInstances == '' ]]; then
  # Clean up old Docker
  echo 'Stopping Veto instances'
  docker stop veto &> /dev/null
  docker rm veto &> /dev/null
  echo "Veto stopped"
else
  echo 'No Veto instance to stop'
fi

