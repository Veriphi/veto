import express, { Application } from 'express'
import proxy from 'express-http-proxy'
import { Config } from '../utils/config'

export default function serveFrontend(config: Config): (app: Application) => Promise<Application> {
  return async (app: Application): Promise<Application> => {
    console.log('Enabling static file serving...')

    // Need to happen last
    if (config.environment === 'dev') {
      // TODO: Will eventually conflict with veto-frontend dev, check how to change start-react-app default port (PORT env?)
      app.use('/', proxy('localhost:3000'))
    } else {
      // Created in Dockerfile using maintenance-frontend package
      app.use('/', express.static('frontend'))
    }

    return app
  }
}
