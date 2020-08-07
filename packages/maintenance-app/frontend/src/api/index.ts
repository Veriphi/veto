import axios from 'axios'
import { throttle } from 'lodash'

// If we're in production we need to set protocol to https
const protocol = window.location.host.includes('localhost') ? 'http:' : 'https:'

// URL endpoints (mainly for use by useRequest hook)
export const balanceUrl = `${protocol}//${window.location.host}/api/getbalance`
export const newAddressUrl = `${protocol}//${window.location.host}/api/getnewaddress`
export const bitcoinOnionAddr = `${protocol}//${window.location.host}/api/getOnionRoute`
export const sparkOnionAddr = `${protocol}//${window.location.host}/api/getSparkOnionRoute`

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

export const setupSifir = throttle(async () => {
  console.log('API frontend setupSifir')
  await axios.post(`${protocol}//${window.location.host}/api/setup-sifir`)
}, 1500)
