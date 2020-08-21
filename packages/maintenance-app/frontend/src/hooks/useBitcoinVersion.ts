import { versions } from '../api'
import useRequest from './useRequest'

const useBitcoinVersion = (): {
  version?: string
  versionError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ bitcoin?: string }>({ url: versions })
  console.log(data)
  return {
    version: data?.bitcoin,
    versionError: error?.message,
    isValidating,
  }
}

export default useBitcoinVersion
