import { onionAddresses } from '../api'
import useRequest from './useRequest'

const useCyphernodeOnion = (): {
  onionAddress?: string
  onionError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ cyphernodeOnion?: string }>({ url: onionAddresses })
  console.log(data)
  return {
    onionAddress: data?.cyphernodeOnion,
    onionError: error?.message,
    isValidating,
  }
}

export default useCyphernodeOnion
