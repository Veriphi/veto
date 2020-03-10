import { Application, Request, Response } from 'express'
import getBalance from '../api/cyphernode/getBalance'

export default function getBalanceRoute(app: Application): Application {
  app.get('/api/getbalance', async (request: Request, response: Response) => {
    try {
      const result = await getBalance()
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
