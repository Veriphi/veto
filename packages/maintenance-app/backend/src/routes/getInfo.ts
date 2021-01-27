import { Application, Request, Response } from 'express'
import getDockerVersion from '../scripts/getDockerVersion'
import getApplicationState from '../scripts/getApplicationState'

export default function getInfoRoute(app: Application): Application {
  app.get('/api/get-info', async (request: Request, response: Response) => {
    try {
      const applicationState = await getApplicationState()
      const dockerVersion = await getDockerVersion()
      response.send({
        info: {
          docker: dockerVersion,
        },
        state: applicationState,
      })
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
