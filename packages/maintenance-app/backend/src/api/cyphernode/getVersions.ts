import { AxiosInstance } from 'axios'
import cyphernodeClient from './client'


// REQUIRES EXTRA WORK TO ADD SPARK AND SIFIR THROUGH THIS METHOD
/*
var fs = require("fs");
const path = require("path");


const file = fs.readFileSync(path.resolve("./src/api/cyphernode/docker-compose.yaml"));
const sparkVersion = fs.readFile(file, function (err: Error, buf: Buffer) {
  return (buf.toString().split(":v")[1].substring(0, 6));
});
*/


const cyphernode: AxiosInstance = cyphernodeClient()
type BitcoinVersion = { bitcoin: string, cyphernode: string, lightning: string, tor: string }

export default async function getVersions(): Promise<BitcoinVersion> {
  type Feature = { label: string; docker: string }
  const installationInfo = await cyphernode.get<{ features: Feature[], optional_features: Feature[] }>('/installation_info')
  return {
    bitcoin:
      installationInfo.data.features.find((feature) => feature.label === 'bitcoin')?.docker.split(":v")[1] ?? ' ',
    cyphernode:
      installationInfo.data.features.find((feature) => feature.label === 'gatekeeper')?.docker.split(":v")[1] ?? ' ',
    lightning:
      installationInfo.data.optional_features.find((feature) => feature.label === 'lightning')?.docker.split(":v")[1] ?? ' ',
    tor:
      installationInfo.data.optional_features.find((feature) => feature.label === 'tor')?.docker.split(":v")[1] ?? ' '
  }
}

