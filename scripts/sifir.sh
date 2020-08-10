#/bin/bash

CFG_PASSWORD=${CFG_PASSWORD:-"veriphirocks!"}

# SETUP TO ADD TO THE INITIAL SETUP OF EVERYTHING VETO

sudo apt-get install git npm sed -y
sudo apt remove docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# REPLACE WITH A DOCKER-HUB PULL SOON
git clone https://github.com/Sifir-io/cyphernode-app.git
cd cyphernode-app && ./build.sh

# CONFIG FILE & VARIABLES
7z e ~/veriphidev/veto/cyphernode/client.7z -p${CFG_PASSWORD}
touch .env

ADDRESS=$(cat ~/veriphidev/veto/cyphernode/.cyphernodeconf/tor/traefik/hidden_service/hostname)
KEY=$(sed -n 's/^.*003=//p' keys.txt)

cat <<EOT >./.env
CYPHERNODE_API_KEY=${KEY}
CYPHERNODE_API_KEY_ID=3
CYPHERNODE_ONION_URL=http://${ADDRESS}:80 
EOT

rm -r keys.txt 

# RUN 
echo 'success on Sifir' 
./run.sh