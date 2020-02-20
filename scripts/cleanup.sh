#!/usr/bin/env bash

SKIP_CYPHERNODE=${SKIP_CYPHERNODE:-false}
VERSION_NUMBER=${VERSION_NUMBER:-latest}

echo "Cleaning up everything..."

if [[ ! -z $(docker container ls -aq) ]]; then
  echo 'Removing all docker container'
  docker container stop $(docker container ls -aq)
  docker container rm $(docker container ls -aq)
else
  echo 'No container to remove, skipping'
fi


if [[ ! -z $(docker images -aq) ]]; then
  echo 'Removing all docker images'
  docker image prune -a -f
  docker system prune -a -f --volumes
else
  echo 'No image to remove, skipping'
fi

if [[ "${SKIP_CYPHERNODE}" == "true" ]]; then
  echo 'Skipping Cyphernode...'
else
  echo 'Removing all cyphernode files'

  # Backup setup file
  mkdir .cyphernode_bk
  cp cyphernode/.gitignore .cyphernode_bk/.gitignore
  cp cyphernode/setup.sh .cyphernode_bk/setup.sh
  cp cyphernode/client.7z .cyphernode_bk/client.7z
  cp cyphernode/config.7z .cyphernode_bk/config.7z

  # Delete all cyphernode files
  sudo rm -fr cyphernode/ && mkdir cyphernode/

  # Restore setup file
  cp .cyphernode_bk/* cyphernode/ && rm -fr .cyphernode_bk
fi

echo 'Clean up completed!'



