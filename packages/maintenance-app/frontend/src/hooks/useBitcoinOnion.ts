import { bitcoinOnionAddr } from '../api'
import useRequest from './useRequest'

const useBitcoinOnion = (): {
  onionAddress?: string
  onionError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ torHostname?: string }>({ url: bitcoinOnionAddr })
  console.log(data)
  return {
    onionAddress: data?.torHostname,
    onionError: error?.message,
    isValidating,
  }
}

export default useBitcoinOnion
