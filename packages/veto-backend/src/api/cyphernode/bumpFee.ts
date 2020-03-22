import { AxiosInstance, AxiosResponse } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()

type Args = {
  txid: string
  confTarget: number
}

export default function spend({ txid, confTarget }: Args): Promise<AxiosResponse> {
  return cyphernode.post('/bumpfee', {
    txid,
    confTarget: Number(confTarget),
  })
}
