import { sparkOnionAddr } from '../api'
import useRequest from './useRequest'

const useSparkOnion = (): {
  onionAddress?: string
  onionError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ torHostname?: string }>({ url: sparkOnionAddr })
  console.log(data)
  return {
    onionAddress: data?.torHostname,
    onionError: error?.message,
    isValidating,
  }
}

export default useSparkOnion
