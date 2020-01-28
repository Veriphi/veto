import serveFrontend from './serveFrontend'
import setupMiddlewares from './middlewares'
import { Application } from 'express'
import { Config } from '../utils/config'
import setupRoutes from '../routes'

export default async function serverSetup(app: Application, config: Config): Promise<void> {
  console.log('Server is starting...')
  setupMiddlewares(app, config)
    .then(setupRoutes)
    // Note: serveFrontend need to be last to not override /api
    .then(serveFrontend(config))
    .then((app: Application) => {
      app.listen(config.port, () => console.log(`Veto-backend is now listening on port ${config.port}!`))
    })
}
