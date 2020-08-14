import { AxiosInstance } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()
type OnionAddresses = { bitcoinOnion : string, lightningOnion : string, cyphernodeOnion : string }

export default async function getOnionAddresses(): Promise<OnionAddresses> {
  type Feature = { label: string; extra: { tor_hostname: string } }
  const installationInfo = await cyphernode.get<{ features: Feature[], optional_features : Feature[]  }>('/installation_info')
  return {
    bitcoinOnion:
      installationInfo.data.features.find((feature) => feature.label === 'bitcoin')?.extra.tor_hostname ?? ' ',
    lightningOnion: 
    installationInfo.data.optional_features.find((feature) => feature.label === 'lightning')?.extra.tor_hostname ?? ' ',
    cyphernodeOnion: 
    installationInfo.data.features.find((feature) => feature.label === 'traefik')?.extra.tor_hostname ?? ' ',
  }
}
