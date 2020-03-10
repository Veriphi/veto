import { Application, Request, Response } from 'express'
import spend from '../api/cyphernode/spend'

export default function spendRoute(app: Application): Application {
  app.post('/api/spend', async (request: Request, response: Response) => {
    try {
      const { address, amount, eventMessage } = request.body
      const result = await spend({ address, amount, eventMessage })
      response.send(result.data)
    } catch (error) {
      if (error.toJSON) {
        console.error(error.toJSON())
      } else {
        console.error(error)
      }

      response.status(500)
      response.send({
        description: error.description,
        stack: error.stack,
        title: error.title,
      })
    }
  })

  return app
}
