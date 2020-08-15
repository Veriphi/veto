import { newAddressUrl } from '../api'
import useRequest from './useRequest'

const useNewAddress = (): {
  address?: string
  addressError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ address?: string }>({ url: newAddressUrl })

  return {
    address: data?.address,
    addressError: error?.message,
    isValidating,
  }
}

export default useNewAddress
