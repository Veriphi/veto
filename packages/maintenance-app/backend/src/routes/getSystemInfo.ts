import { Application, Request, Response } from 'express'
import getSystemInfo from '../api/cyphernode/getSystemInfo'

export default function getSystemInfoRoute(app: Application): Application {
  app.get('/api/getsysteminfo', async (request: Request, response: Response) => {
    console.log('/api/getsysteminfo')
    try {
      const data = await getSystemInfo()
      console.log(data)
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
