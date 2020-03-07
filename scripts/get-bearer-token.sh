#!/usr/bin/env bash

# Choose key 003 which corresponds to "admin priviledges", can do stats, spender, watcher actions on cyphernode.
id='003'
h64=$(echo -n "{\"alg\":\"HS256\",\"typ\":\"JWT\"}" | base64)
p64=$(echo -n "{\"id\":\"$id\",\"exp\":$((`date +"%s"`+1000))}" | base64)
# Get the key that correspond to the keyId
k=`cat ./cyphernode/keys.txt | grep "${keyId}=" | sed s/$keyId=//`
s=$(echo -n "$h64.$p64" | openssl dgst -hmac "$k" -sha256 -r | cut -sd ' ' -f1)
token="$h64.$p64.$s"
echo $token