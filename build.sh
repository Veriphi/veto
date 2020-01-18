#!/usr/bin/env bash

CFG_PASSWORD=${CFG_PASSWORD:-default}
VERSION_NUMBER=${VERSION_NUMBER:-latest}

echo "Building Veto docker image..."
docker build . -t veto:${VERSION_NUMBER}

CFG_PASSWORD=$CFG_PASSWORD ./cyphernode/setup.sh -irc
