import { Application, Request, Response } from 'express'
import getActiveWatches from '../api/cyphernode/getActiveWatches'

export default function getActiveWatchesRoute(app: Application): Application {
  app.get('/api/getactivewatches', async (request: Request, response: Response) => {
    try {
      const result = await getActiveWatches()

      console.log('result', Object.keys(result.data))

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
