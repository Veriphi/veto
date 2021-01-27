import { AxiosInstance } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()
type BitcoinOnion = { torHostname: string }

export default async function getBitcoinOnion(): Promise<BitcoinOnion> {
  type Feature = { label: string; extra: { tor_hostname: string } }
  const installationInfo = await cyphernode.get<{ features: Feature[] }>('/installation_info')
  return {
    torHostname:
      installationInfo.data.features.find((feature) => feature.label === 'bitcoin')?.extra.tor_hostname ?? ' ',
  }
}
