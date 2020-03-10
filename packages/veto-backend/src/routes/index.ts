import { Application } from 'express'
import getActiveWatchesRoute from './getActiveWatches'
import getVersion from './getVersion'
import getMempoolInfo from './getMempoolInfo'
import getNewAddress from './getNewAddress'
import getBalance from './getBalance'
import spend from './spend'

// Setup all available routes from FE
export default function setupRoutes(app: Application): Application {
  console.log('Bootstrapping routes...')

  getMempoolInfo(app)
  getNewAddress(app)
  getActiveWatchesRoute(app)
  getVersion(app)
  spend(app)
  getBalance(app)

  return app
}
