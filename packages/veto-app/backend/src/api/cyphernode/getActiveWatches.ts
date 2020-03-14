import { AxiosInstance, AxiosResponse } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()

export default function getActiveWatches(): Promise<AxiosResponse> {
  return cyphernode.get('/getactivewatches')
}
