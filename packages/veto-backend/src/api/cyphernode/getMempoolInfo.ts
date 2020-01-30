import { AxiosInstance, AxiosResponse } from 'axios'
import cyphernodeClient from './client'

const cyphernode: AxiosInstance = cyphernodeClient()

export default function getMempoolInfo(): Promise<AxiosResponse> {
  return cyphernode.get('/getmempoolinfo')
}
