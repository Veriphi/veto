import { AxiosInstance, AxiosResponse } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()

type Args = {
  address: string
  amount: number
  eventMessage?: string
}

export default function spend({ address, amount, eventMessage }: Args): Promise<AxiosResponse> {
  return cyphernode.post('/spend', {
    address,
    amount,
    eventMessage,
  })
}
