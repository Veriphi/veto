#!/usr/bin/env bash

# Output the state of veto & cyphernode as a json object
# This is probably not the best way to do this has it depends a lot on docker and the name of the images
# Some kind of health check might be better suited for this feature but would take more time to write properly 
# For now this is the best I can come up with 

echo "{ \"veto\": $(docker inspect -f '{{json .State}}' veto)}"
cyphernode_instances=$(docker ps --format '{{.Names}}' | grep cyphernode_)
  for instance in $cyphernode_instances
  do
    echo "{ \"${instance}\": $(docker inspect -f '{{json .State}}' ${instance})}"
  done

exit 0

cyphernode_instances=$(docker ps --format '{{.Names}}' | grep cyphernode_)
veto_instances=$(docker ps --format '{{.Names}}' | grep veto)

output="{"
# Output veto state
if [[ -z $cyphernode_instances ]]; then
  output+="  \"veto\": [],"
else
  output+="  \"veto\": $( docker inspect -f '{{json .State}}' veto ),"
fi

# Output cyphernode state
if [[ -z $cyphernode_instances ]]; then
  output+="  \"cyphernode\": []"
else
  output+="  \"cyphernode\": ["
  for instance in $cyphernode_instances
  do
    output+="$( docker inspect -f '{{json .State}}' ${instance} ),"
  done
  output+="]"
fi

output+="}"

echo $output