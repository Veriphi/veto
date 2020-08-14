import { onionAddresses } from '../api'
import useRequest from './useRequest'

const useBitcoinOnion = (): {
  onionAddress?: string
  onionError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ bitcoinOnion?: string }>({ url: onionAddresses })
  console.log(data)
  return {
    onionAddress: data?.bitcoinOnion,
    onionError: error?.message,
    isValidating,
  }
}

export default useBitcoinOnion
