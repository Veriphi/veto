import { Application } from 'express'
import getActiveWatchesRoute from './getActiveWatches'
import getVersionRoute from './getVersion'
import getMempoolInfoRoute from './getMempoolInfo'
import getNewAddressRoute from './getNewAddress'
import getBalanceRoute from './getBalance'
import spendRoute from './spend'
import bumpFeeRoute from './bumpFee'
import getBitcoinOnionRoute from './getBitcoinOnion'
import getSparkOnionRoute from './getSparkOnion'
import getInfoRoute from './getInfo'
import installRoute from './install'
import setupSifirRoute from './setupSifir'

// Setup all available routes from FE
export default function setupRoutes(app: Application): Application {
  console.log('Bootstrapping routes...')
  console.log('-----------------')
  console.log(setupSifirRoute)

  getMempoolInfoRoute(app)
  getNewAddressRoute(app)
  getActiveWatchesRoute(app)
  getVersionRoute(app)
  spendRoute(app)
  getBalanceRoute(app)
  bumpFeeRoute(app)
  getBitcoinOnionRoute(app)
  getSparkOnionRoute(app)
  getInfoRoute(app)
  installRoute(app)
  setupSifirRoute(app)

  return app
}
