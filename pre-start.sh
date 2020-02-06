#!/usr/bin/env bash

CFG_PASSWORD="${CFG_PASSWORD:-default}"

# Extract key & cert needed to communicate with cyphernode
echo "Extracting cyphernode credentials..."

7za -o'./cyphernode' -p$CFG_PASSWORD -y e ./cyphernode/client.7z
