import { AxiosInstance } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()
type SparkOnion = { torHostname: string }

export default async function getSparkOnion(): Promise<SparkOnion> {
  type Feature = { label: string; extra: { tor_hostname: string } }
  const installationInfo = await cyphernode.get<{ features: Feature[] }>('/installation_info')
  return {
    torHostname:
      installationInfo.data.features.find((feature) => feature.label === 'traefik')?.extra.tor_hostname ?? ' ',
  }
}
