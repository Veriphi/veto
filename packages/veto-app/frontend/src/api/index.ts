import axios from 'axios'

// URL endpoints (mainly for use by useRequest hook)
export const balanceUrl = `http://${window.location.host}/api/getbalance`
export const newAddressUrl = `http://${window.location.host}/api/getnewaddress`

// Calls
type spendResponse = {
  status: 'string'
  hash: 'string'
}
export const spend = async ({ address, amount, eventMessage }): Promise<spendResponse> => {
  const { data }: { data: spendResponse } = await axios.post(`http://${window.location.host}/api/spend`, {
    address,
    amount,
    eventMessage,
  })
  return data
}
