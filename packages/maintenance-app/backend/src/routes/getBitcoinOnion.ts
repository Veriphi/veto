import { Application, Request, Response } from 'express'
import getBitcoinOnion from '../api/cyphernode/getBitcoinOnion'

export default function getBitcoinOnionRoute(app: Application): Application {
  console.log('-----------------')
  console.log('getBitcoinOnionRoute')
  app.get('/api/getOnionRoute', async (request: Request, response: Response) => {
    /**
     *  This route needs to do 2 things:
     *  1. Fetch a new receiving address from cyphernode
     *  2. Tell cyphernode to watch this new address (WE MAY NOT NEED THIS - UNDER CONSIDERATION OF ALTERNATIVES)
     */
    console.log('/api/getOnionRoute')
    try {
      // 1. fetch the new address
      const data = await getBitcoinOnion()

      // 2. tell cyphernode to watch this address
      // (WE MAY NOT NEED THIS - UNDER CONSIDERATION OF ALTERNATIVES)

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
