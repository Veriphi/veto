#/bin/bash

## SETUP 

sudo apt-get install git npm sed
git clone https://github.com/Sifir-io/cyphernode-app.git
cd cyphernode-app && ./build.sh

## PLACE KEYS AND CERT
########## PASSWORD CAN'T BE STATIC
7z e ~/veriphidev/veto/cyphernode/client.7z -pveriphirocks!

KEY=$(sed -n 's/^.*003=//p' keys.txt)
ADDRESS=$(cat ~/veriphidev/veto/cyphernode/dist/.cyphernodeconf/tor/traefik/hidden_service/hostname)

touch .env

cat <<EOT >./.env
CYPHERNODE_API_KEY=${KEY}
CYPHERNODE_API_KEY_ID=3
CYPHERNODE_ONION_URL=http://${ADDRESS}:80 
EOT

rm -r keys.txt 

# RUN 
echo 'success on Sifir'
./run.sh