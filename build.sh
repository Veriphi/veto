#!/usr/bin/env bash

SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-"false"}
CFG_PASSWORD=${CFG_PASSWORD:-""}
VERSION_NUMBER=${VERSION_NUMBER:-"latest"}

#--------------------------------------#
#-- Veto ------------------------------#
#--------------------------------------#
echo "Building Veto docker image..."
docker build . -t "veto:${VERSION_NUMBER}"

#--------------------------------------#
#-- Cyphernode ------------------------#
#--------------------------------------#
if [[ "${SKIP_CYPHERNODE}" -eq "true" ]]; then
  echo 'Skip building Cyphernode...'
elif [ "${CFG_PASSWORD}" -ne "" ]; then
  echo 'Building Cyphernode' && \
  # Install cyphernode using premade config
  CFG_PASSWORD=$CFG_PASSWORD ./cyphernode/setup.sh -irc
else
  echo 'No cyphernode password provided (CFG_PASSWORD)'
  echo 'Skip building Cyphernode...'
fi

# Extract key & cert
CFG_PASSWORD=$CFG_PASSWORD ./pre-run.sh && \

echo "Build completed"
