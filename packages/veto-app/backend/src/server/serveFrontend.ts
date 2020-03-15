import express, { Application } from 'express'
import proxy from 'express-http-proxy'
import { Config } from '../utils/config'

export default function serveFrontend(config: Config): (app: Application) => Promise<Application> {
  return async (app: Application): Promise<Application> => {
    console.log('Enabling static file serving...')

    // Need to happen last
    if (config.environment === 'dev') {
      app.use('/', proxy('localhost:3000'))
    } else {
      // Created in Dockerfile using veto-frontend package
      console.log(`Service static files from ${config.pathToStaticFiles}`)
      app.use('/', express.static(config.pathToStaticFiles))
    }

    return app
  }
}
