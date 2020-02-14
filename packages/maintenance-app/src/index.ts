import { Request, Response } from 'express'
import express from 'express'
import config from './utils/config'
import getDockerVersion from './scripts/getDockerVersion'

const app = express()

app.get('/', async (request: Request, response: Response) => {
  try {
    const dockerVersion = await getDockerVersion()
    response.send(`
            <table>
                <th>
                    <td>Software</td>
                    <td>Version</td>
                </th>
                <tr>
                    <td>Docker version</td>
                    <td>${dockerVersion}</td>
                </tr>
            </table>
  `)
  } catch (error) {
    // TODO: Give proper error handling
    console.error(error)
    response.send(error.description)
  }
})

app.listen(config.port, () => console.log(`Maintenance-app is now listening on port ${config.port}!`))
