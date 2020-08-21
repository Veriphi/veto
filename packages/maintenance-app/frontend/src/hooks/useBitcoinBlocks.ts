import { blockchainInfo } from '../api'
import useRequest from './useRequest'

const useBitcoinBlocks = (): {
  blocks?: Number
  blocksError?: string
  isValidating: boolean
} => {
  const { data, error, isValidating } = useRequest<{ blocks?: Number }>({ url: blockchainInfo })
  console.log(data)
  return {
    blocks: data?.blocks,
    blocksError: error?.message,
    isValidating,
  }
}

export default useBitcoinBlocks
