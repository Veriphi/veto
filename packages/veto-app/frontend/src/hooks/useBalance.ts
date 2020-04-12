import { getBalanceUrl } from '../api'
import useRequest from './useRequest'

const useBalance = (): { balance: string | undefined; balanceError: string | undefined } => {
  const { data, error } = useRequest({ url: getBalanceUrl })

  return {
    balance: data && data.balance,
    balanceError: error && error.message,
  }
}

export default useBalance
