import axios from 'axios'

// If we're in production we need to set protocol to https
const protocol = window.location.host.includes('localhost') ? 'http:' : 'https:'

// URL endpoints (mainly for use by useRequest hook)
export const balanceUrl = `${protocol}//${window.location.host}/api/getbalance`
export const newAddressUrl = `${protocol}//${window.location.host}/api/getnewaddress`

// Calls
type spendResponse = {
  status: 'string'
  hash: 'string'
}
export const spend = async ({ address, amount, eventMessage }): Promise<spendResponse> => {
  const { data }: { data: spendResponse } = await axios.post(`${protocol}//${window.location.host}/api/spend`, {
    address,
    amount,
    eventMessage,
  })
  return data
}
