import { AxiosInstance } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()
type BlockchainInfo = { blocks : Number, headers : Number, size : Number }

export default async function getBlockchainInfo(): Promise<BlockchainInfo> {
  const blockchainInfo = await cyphernode.get<{ blocks: Number, headers : Number, size_on_disk : Number }>('/getblockchaininfo')
  return {
    blocks:
    blockchainInfo.data.blocks,
    headers: 
    blockchainInfo.data.headers,
    size: 
    blockchainInfo.data.size_on_disk,
  }
}