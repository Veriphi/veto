import { Application, Request, Response } from 'express'
import bumpFee from '../api/cyphernode/bumpFee'

export default function spendRoute(app: Application): Application {
  app.post('/api/bumpfee', async (request: Request, response: Response) => {
    try {
      const { txid, confTarget } = request.body
      const result = await bumpFee({ txid, confTarget })
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
