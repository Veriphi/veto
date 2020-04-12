import { getNewAddressUrl } from '../api'
import useRequest from './useRequest'

const useNewAddress = (): {
  address: string | undefined
  addressError: string | undefined
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest({ url: getNewAddressUrl })

  return {
    address: data && data.address,
    addressError: error && error.message,
    isValidating,
  }
}

export default useNewAddress
