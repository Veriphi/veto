#!/usr/bin/env bash

SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-false}
VERSION_NUMBER=${VERSION_NUMBER:-latest}

echo "Stopping everything..."

if [[ "${SKIP_CYPHERNODE}" == "true" ]]; then
  echo 'Skipping Cyphernode...'
elif [[ -f ./cyphernode/start.sh ]]; then
  echo 'Cyphernode stop script found. Stopping Cyphernode now...'
  cd cyphernode/
  ./stop.sh
  cd ../
else
  echo 'No Cyphernode stop script found. Skiping...'
fi

# Fetch running Veto instances
runningVetoInstances=$(docker ps | grep "veto" | awk '{ print $1 }');

if [[ ! ''$runningVetoInstances == '' ]]; then
  # Clean up old Docker
  echo 'Stopping Veto instances'
  docker stop veto &> /dev/null
  docker rm veto &> /dev/null
else
  echo 'No Veto instance to stop'
fi

