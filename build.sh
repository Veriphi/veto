#!/usr/bin/env bash

CFG_PASSWORD=${CFG_PASSWORD:-default}
VERSION_NUMBER=${VERSION_NUMBER:-latest}

#--------------------------------------#
#-- Veto ------------------------------#
#--------------------------------------#
echo "Building Veto docker image..."
docker build . -t veto:${VERSION_NUMBER} && \

#--------------------------------------#
#-- Cyphernode ------------------------#
#--------------------------------------#
# Install cyphernode using premade config
CFG_PASSWORD=$CFG_PASSWORD ./cyphernode/setup.sh -irc && \

# Extract key & cert
CFG_PASSWORD=$CFG_PASSWORD ./pre-run.sh && \

echo "Build completed"
