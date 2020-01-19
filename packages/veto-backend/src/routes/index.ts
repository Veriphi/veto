import { Application } from 'express'
import getActiveWatchesRoute from './getActiveWatches'
import getVersion from './getVersion'

// Setup all available routes from FE
export default function setupRoutes(app: Application): Application {
  console.log('Bootstrapping routes...')

  getActiveWatchesRoute(app)
  getVersion(app)

  return app
}
