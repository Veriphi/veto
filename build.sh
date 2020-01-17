#!/usr/bin/env bash

VERSION_NUMBER=${VERSION_NUMBER:-latest}

docker build . -t veto:${VERSION_NUMBER}
