import { Application, Request, Response } from 'express'
import getMempoolInfo from '../api/cyphernode/getMempoolInfo'

export default function getMempoolInfoRoute(app: Application): Application {
  app.get('/api/getmempoolinfo', async (request: Request, response: Response) => {
    try {
      console.log('\n\n\n\n', 'ATTEMPTING GETMEMPOOLINFO', '\n\n\n\n')
      const result = await getMempoolInfo()

      console.log('\n%cresult', 'color:orange;font-weight:bold;', result, '\n\n')
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
