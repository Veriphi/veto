import config from '../utils/config'
import { Application, Request, Response } from 'express'

export default function getActiveWatchesRoute(app: Application): Application {
  app.get('/api/version', async (request: Request, response: Response) => {
    response.send({ name: 'Veto', version: config.version })
  })

  return app
}
