import { Application, Request, Response } from 'express'
import getOnionAddresses from '../api/cyphernode/getOnionAddresses'

export default function getOnionAddressesRoute(app: Application): Application {
  app.get('/api/getonionaddresses', async (request: Request, response: Response) => {
    console.log('/api/getonionaddresses')
    try {
      const data = await getOnionAddresses()
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
