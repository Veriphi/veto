import { AxiosInstance } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()
type BlockchainInfo = { id: String, peers: Number, channels: Number }

export default async function getBlockchainInfo(): Promise<BlockchainInfo> {
  const lightningInfo = await cyphernode.get<{ id: string, num_peers: Number, num_active_channels: Number }>('/ln_getinfo')
  return {
    id:
      lightningInfo.data.id,
    peers:
      lightningInfo.data.num_peers,
    channels:
      lightningInfo.data.num_active_channels,
  }
}
