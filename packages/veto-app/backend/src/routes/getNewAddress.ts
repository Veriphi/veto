import { Application, Request, Response } from 'express'
import getNewAddress from '../api/cyphernode/getNewAddress'

export default function getNewAddressRoute(app: Application): Application {
  app.get('/api/getnewaddress', async (request: Request, response: Response) => {
    /**
     *  This route needs to do 2 things:
     *  1. Fetch a new receiving address from cyphernode
     *  2. Tell cyphernode to watch this new address (WE MAY NOT NEED THIS - UNDER CONSIDERATION OF ALTERNATIVES)
     */
    try {
      // 1. fetch the new address
      const { data } = await getNewAddress()

      // 2. tell cyphernode to watch this address
      // (WE MAY NOT NEED THIS - UNDER CONSIDERATION OF ALTERNATIVES)

      response.send(data)
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
