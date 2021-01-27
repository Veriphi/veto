import { Application, Request, Response } from 'express'
import setupSifir from '../scripts/setupSifir'

export default function setupSifirRoute(app: Application): Application {
  app.post('/api/setup-sifir', async (request: Request, response: Response) => {
    try {
      console.log('api/setup-sifir')
      await setupSifir()
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
