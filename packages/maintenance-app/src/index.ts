import { Request, Response } from 'express'
import express from 'express'
import config from './utils/config'
import getDockerVersion from './scripts/getDockerVersion'
import getApplicationState, { ApplicationState, State } from './scripts/getApplicationState'
import emptyFalsy from '@veto/utils/emptyFalsy'

const app = express()

app.post('/factory-reset', async (request: Request, response: Response) => {
  response.send('FACTORY RESET')
})
app.post('/install', async (request: Request, response: Response) => {
  response.send('INSTALL')
})

function isInstalled(applicationState: ApplicationState): boolean {
  console.log('isInstalled', applicationState)
  if ([State.UNKNOWN, State.MISSING].includes(applicationState.cyphernode)) {
    return false
  }

  if ([State.UNKNOWN, State.MISSING].includes(applicationState.veto)) {
    return false
  }

  return true
}

app.get('/', async (request: Request, response: Response) => {
  try {
    const dockerVersion = await getDockerVersion()
    const applicationState = await getApplicationState()

    response.send(emptyFalsy`
<html>
    <body>
        <h2>Controls</h2>
            ${!isInstalled(applicationState) &&
              `
            <form method="post" action="/install">
                <input type="submit" value="Install Veto">
            </form>
            `}
            
            ${isInstalled(applicationState) &&
              `
            <form method="post" action="/factory-reset">
                <input type="submit" value="Factory Reset">
            </form>
            `}
        <h2>State</h2>
        <table>
            <th>
                <td>Software</td>
                <td>Version</td>
            </th>
            <tr>
                <td>Veto</td>
                <td>${applicationState.veto}</td>
            </tr>
            <tr>
                <td>Cyphernode</td>
                <td>${applicationState.cyphernode}</td>
            </tr>
        </table>
        <h2>Versions</h2>
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
    </body>
        
</html>
  `)
  } catch (error) {
    // TODO: Give proper error handling
    console.error(error)
    response.send(error.description)
  }
})

app.listen(config.port, () => console.log(`Maintenance-app is now listening on port ${config.port}!`))
