import { Application } from 'express'
import getActiveWatchesRoute from './getActiveWatches'
import getVersionRoute from './getVersion'
import getMempoolInfoRoute from './getMempoolInfo'
import getNewAddressRoute from './getNewAddress'
import getBalanceRoute from './getBalance'
import spendRoute from './spend'
import bumpFeeRoute from './bumpFee'

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

  return app
}
