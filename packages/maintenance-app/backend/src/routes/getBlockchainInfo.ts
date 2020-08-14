import { Application, Request, Response } from 'express'
import getBlockchainInfo from '../api/cyphernode/getBlockchainInfo'

export default function getBlockchainInfoRoute(app: Application): Application {
  app.get('/api/getblockchaininfo', async (request: Request, response: Response) => {
    console.log('/api/getblockchaininfo')
    try {
      const data = await getBlockchainInfo()
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
