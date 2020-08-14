import axios from 'axios'
import { throttle } from 'lodash'

// If we're in production we need to set protocol to https
const protocol = window.location.host.includes('localhost') ? 'http:' : 'https:'

// URL endpoints (mainly for use by useRequest hook)
export const balanceUrl = `${protocol}//${window.location.host}/api/getbalance`
export const newAddressUrl = `${protocol}//${window.location.host}/api/getnewaddress`
export const onionAddresses = `${protocol}//${window.location.host}/api/getonionaddresses`
export const versions = `${protocol}//${window.location.host}/api/getversions`
export const systemInfo = `${protocol}//${window.location.host}/api/getsysteminfo`
export const blockchainInfo = `${protocol}//${window.location.host}/api/getblockchaininfo`
export const lightningInfo = `${protocol}//${window.location.host}/api/getlightninginfo`


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
