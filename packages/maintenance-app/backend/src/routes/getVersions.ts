import { Application, Request, Response } from 'express'
import getVersions from '../api/cyphernode/getVersions'

export default function getVersionsRoute(app: Application): Application {
  app.get('/api/getversions', async (request: Request, response: Response) => {
    console.log('/api/getversions')
    try {
      const data = await getVersions()
      console.log(data)
      response.send(data)
    } catch (error) {
      const errorResponse = error.toJSON ? console.error(error.toJSON()) : console.error(error)

      response.status(500)

      response.send({
        error: errorResponse,
      })
    }
  })

  return app
}
