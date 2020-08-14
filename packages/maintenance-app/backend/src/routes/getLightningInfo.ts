import { Application, Request, Response } from 'express'
import getLightningInfo from '../api/cyphernode/getLightningInfo'

export default function getLightningInfoRoute(app: Application): Application {
  app.get('/api/getlightninginfo', async (request: Request, response: Response) => {
    console.log('/api/getlightninginfo')
    try {
      const data = await getLightningInfo()
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
