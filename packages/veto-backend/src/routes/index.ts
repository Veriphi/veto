import { Application } from 'express'
import getActiveWatchesRoute from './getActiveWatches'
import getVersion from './getVersion'
import getMempoolInfo from './getMempoolInfo'

// Setup all available routes from FE
export default function setupRoutes(app: Application): Application {
  console.log('Bootstrapping routes...')

  getMempoolInfo(app)
  getActiveWatchesRoute(app)
  getVersion(app)

  return app
}
