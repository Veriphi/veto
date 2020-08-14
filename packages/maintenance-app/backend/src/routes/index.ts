import { Application } from 'express'
import getActiveWatchesRoute from './getActiveWatches'
import getVersionRoute from './getVersion'
import getMempoolInfoRoute from './getMempoolInfo'
import getNewAddressRoute from './getNewAddress'
import getBalanceRoute from './getBalance'
import spendRoute from './spend'
import bumpFeeRoute from './bumpFee'
import getOnionAddressesRoute from './getOnionAddresses'
import getInfoRoute from './getInfo'
import installRoute from './install'
import setupSifirRoute from './setupSifir'
import getVersionsRoute from './getVersions'
import getSystemInfoRoute from './getSystemInfo'
import getBlockchainInfoRoute from './getBlockchainInfo'
import getLightningInfoRoute from './getLightningInfo'

// Setup all available routes from FE
export default function setupRoutes(app: Application): Application {
  console.log('Bootstrapping routes...')

  getMempoolInfoRoute(app)
  getNewAddressRoute(app)
  getActiveWatchesRoute(app)
  getVersionRoute(app)
  spendRoute(app)
  getBalanceRoute(app)
  bumpFeeRoute(app)
  getOnionAddressesRoute(app)
  getInfoRoute(app)
  installRoute(app)
  setupSifirRoute(app)
  getVersionsRoute(app)
  getSystemInfoRoute(app)
  getBlockchainInfoRoute(app)
  getLightningInfoRoute(app)

  return app
}
