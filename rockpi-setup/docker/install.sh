#!/usr/bin/env bash

#docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
 sudo add-apt-repository  \
    "deb [arch=arm64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
sudo apt-get update -y
sudo apt-get install docker-ce docker-compose
sudo groupadd docker &
sudo usermod -aG docker rock
