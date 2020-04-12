import axios from 'axios'

export const getNewAddress = async (): Promise<string> => {
  const { data }: { data: { address: string } } = await axios(`http://${window.location.host}/api/getnewaddress`)
  return data.address
}

export const getBalanceUrl = `http://${window.location.host}/api/getbalance`

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
