import { blockchainInfo } from '../api'
import useRequest from './useRequest'

const useBitcoinHeaders = (): {
  headers?: Number
  headersError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ headers?: Number }>({ url: blockchainInfo })
  console.log(data)
  return {
    headers: data?.headers,
    headersError: error?.message,
    isValidating,
  }
}

export default useBitcoinHeaders
