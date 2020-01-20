#!/usr/bin/env bash

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

