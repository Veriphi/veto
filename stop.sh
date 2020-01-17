#!/usr/bin/env bash

# Clean up old docker
docker stop veto &> /dev/null
docker rm veto &> /dev/null
