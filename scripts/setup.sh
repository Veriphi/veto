#!/usr/bin/env bash

SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-"false"}
SKIP_VETO=${SKIP_VETO:-"false"}
CFG_PASSWORD=${CFG_PASSWORD:-"veriphirocks!"}
VERSION_NUMBER=${VERSION_NUMBER:-"latest"}
CURRENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

#--------------------------------------#
#-- Veto ------------------------------#
#--------------------------------------#
if [ "${SKIP_VETO}" == "true" ]; then
  echo 'Skip building Veto...'
else
  echo "Building Veto docker image..." && \
  docker build . --target veto-app -t "veto:${VERSION_NUMBER}" && \
  echo "Building Veto's screen-app docker image..." && \
  docker build . --target screen-app -t "veto-screen:${VERSION_NUMBER}"
fi

#--------------------------------------#
#-- Cyphernode ------------------------#
#--------------------------------------#
if [ "${SKIP_CYPHERNODE}" == "true" ]; then
  echo 'Skip building Cyphernode...'
elif [ "${CFG_PASSWORD}" != "" ]; then
  echo 'Building Cyphernode' && \
  # Install cyphernode using premade config
  CFG_PASSWORD=$CFG_PASSWORD ./cyphernode/setup.sh -irc

  # Extract key & cert
  CFG_PASSWORD=$CFG_PASSWORD . ${CURRENT_DIR}/pre-start.sh
else
  echo 'No cyphernode password provided (CFG_PASSWORD)'
  echo 'Skip building Cyphernode...'
fi

echo "Setup completed"
