import { Application, Request, Response } from 'express'
import getSparkOnion from '../api/cyphernode/getSparkOnion'

export default function getSparkOnionRoute(app: Application): Application {
  app.get('/api/getSparkOnionRoute', async (request: Request, response: Response) => {
    console.log('/api/getSparkOnionRoute')
    try {
      const data = await getSparkOnion()

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
