#!/usr/bin/env bash

# Note:
# This is kinda hackish to bypass the package manager and will be a pain to update in the future.
# Change it before it becomes a problem

sudo apt-get uninstall nodejs -y

# Download node 12
wget https://nodejs.org/dist/latest-v12.x/node-v12.16.0-linux-arm64.tar.gz
tar -xvf node-v12.16.0-linux-arm64.tar.gz

# Copy node so it reside with other applications
sudo cp -r node-v12.16.0-linux-arm64 /etc/node12.16.0

# Make node accessible though cli
sudo unlink /usr/bin/node
sudo ln -s /etc/node12.16.0/bin/node /usr/bin/node

# Make sure node is properly installed
node --version
