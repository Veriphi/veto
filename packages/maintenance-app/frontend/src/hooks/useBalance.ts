import { balanceUrl } from '../api'
import useRequest from './useRequest'

const useBalance = (): { balance?: string; balanceError?: string } => {
  const { data, error } = useRequest<{ balance?: string }>({ url: balanceUrl })

  return {
    balance: data?.balance,
    balanceError: error?.message,
  }
}

export default useBalance
