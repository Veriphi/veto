import serveFrontend from './serveFrontend'
import setupMiddlewares from './middlewares'
import { Application } from 'express'
import { Config } from '../utils/config'

export default async function serverSetup(
  app: Application,
  config: Config,
  setupRoutes: (app: Application) => Application,
): Promise<void> {
  console.log('Server is starting...')
  setupMiddlewares(app, config)
    .then(setupRoutes)
    // Note: serveFrontend need to be last to not override /api
    .then(serveFrontend(config))
    .then((app: Application) => {
      app.listen(config.port, () => console.log(`${config.appName} is now listening on port ${config.port}!`))
    })
}
