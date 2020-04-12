import axios from 'axios'

export const getBalanceUrl = `http://${window.location.host}/api/getbalance`
export const getNewAddressUrl = `http://${window.location.host}/api/getnewaddress`

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
