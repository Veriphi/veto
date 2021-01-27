import { Application, Request, Response } from 'express'
import getBitcoinOnion from '../api/cyphernode/getBitcoinOnion'

export default function getBitcoinOnionRoute(app: Application): Application {
  app.get('/api/getOnionRoute', async (request: Request, response: Response) => {
    console.log('/api/getOnionRoute')
    try {
      const data = await getBitcoinOnion()
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
