#!/usr/bin/env bash

# Output the state of veto & cyphernode as a json object
# This is probably not the best way to do this has it depends a lot on docker and the name of the images
# Some kind of health check might be better suited for this feature but would take more time to write properly 
# For now this is the best I can come up with 


# Veto state detection

# Default to "unknown"
veto_container_state='{ "Status": "unknown" }'

is_veto_installed=$(docker images --quiet veto)
if [[ ! -z "${is_veto_installed}" ]]; then
  veto_container_state='{ "Status": "created" }'
fi

is_veto_started=$(docker ps --quiet --filter name=veto)
if [[ ! -z "${is_veto_started}" ]]; then
  veto_container_state=$( docker inspect --type=container --format '{{json .State}}' veto )
fi

echo "{ \"veto\": ${veto_container_state} }"

# Get the list of all cyphernode instance
cyphernode_instances=$(docker ps --format '{{.Names}}' | grep cyphernode_)

for instance in $cyphernode_instances
do
  # Cyphernote state detection
  cyphernode_state=$(docker inspect --type=container --format '{{json .State}}' "${instance}")

  # Default to "unknown"
  if [[ -z "${cyphernode_state}" ]]; then
    cyphernode_state='{ "Status": "unknown" }'
  fi

  echo "{ \"${instance}\": \"${cyphernode_state}\""
done

exit 0
