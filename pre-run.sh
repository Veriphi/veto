#!/usr/bin/env bash

CFG_PASSWORD=${CFG_PASSWORD:-default}

# Extract key & cert needed to communicate with cyphernode
echo "Extracting cyphernode credentials..."
7z e cyphernode/client.7z -p$CFG_PASSWORD -o./cyphernode -y
