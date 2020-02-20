#!/usr/bin/env bash

MISSING='missing'
INSTALLED='installed'
STOPPED='stopped'
RUNNING='running'

VETO_STATE=$STOPPED
CYPHERNODE_STATE=$STOPPED


# @TODO: Add check to define veto & cyphernode state
# Check for image
#   Installed ? Missing
# Check for container
#   Stopped ? Installed
# Check for state
#   Running ? Stopped

echo "${VETO_STATE},${CYPHERNODE_STATE}"
