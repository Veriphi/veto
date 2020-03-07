import { AxiosInstance, AxiosResponse } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()

type Args = {
  address: string
  eventMessage?: string
}

export default function watch({ address, eventMessage }: Args): Promise<AxiosResponse> {
  return cyphernode.post('/watch', {
    address,
    // If running cyphernode locally use 'host.docker.internal'
    // if using the the aws instance of cyphernode, you must use your IP.
    unconfirmedCallbackURL: 'host.docker.internal:8080/api/notificationcallback',
    confirmedCallbackURL: 'host.docker.internal:8080/api/notificationcallback',
    eventMessage,
  })
}
