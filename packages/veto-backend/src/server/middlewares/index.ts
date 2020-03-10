import { Application } from 'express'
import { Config } from '../../utils/config'
import bodyParser from 'body-parser'

export default async function setupMiddlewares(app: Application, config: Config): Promise<Application> {
  console.log('Bootstrapping middlewares...')

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  return app
}
