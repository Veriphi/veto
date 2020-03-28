import { AxiosInstance, AxiosResponse } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()

type Args = {
  txId: string
  confTarget: number
}

export default function spend({ txId, confTarget }: Args): Promise<AxiosResponse> {
  return cyphernode.post('/bumpfee', {
    txid: txId,
    confTarget,
  })
}
