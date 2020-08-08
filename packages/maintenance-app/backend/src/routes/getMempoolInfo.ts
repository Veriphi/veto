import { Application, Request, Response } from 'express'
import getMempoolInfo from '../api/cyphernode/getMempoolInfo'

export default function getMempoolInfoRoute(app: Application): Application {
  app.get('/api/getmempoolinfo', async (request: Request, response: Response) => {
    try {
      const result = await getMempoolInfo()
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
