import express, { Request, Response, Application } from 'express'
import config from './utils/config'
import serverSetup from './server'
import getApplicationState from './scripts/getApplicationState'
import getDockerVersion from './scripts/getDockerVersion'
import { ApplicationState, State } from '@maintenance-app/types/src'

const app = express()

// TODO: Move to ./utils
function isInstalled(applicationState: ApplicationState): boolean {
  if ([State.UNKNOWN, State.MISSING].includes(applicationState.cyphernode)) {
    return false
  }

  if ([State.UNKNOWN, State.MISSING].includes(applicationState.veto)) {
    return false
  }

  return true
}

serverSetup(app, config, (app: Application) => {
  // TODO: Move all routes to their own folder
  app.get('/api/get-info', async (request: Request, response: Response) => {
    const applicationState = await getApplicationState()
    const dockerVersion = await getDockerVersion()

    response.send({
      info: {
        docker: dockerVersion,
      },
      state: applicationState,
    })
  })

  app.post('/api/factory-reset', async (request: Request, response: Response) => {
    const applicationState = await getApplicationState()
    if (isInstalled(applicationState)) {
      response.send('FACTORY RESET')
    }
  })

  app.post('/api/install', async (request: Request, response: Response) => {
    const applicationState = await getApplicationState()
    if (!isInstalled(applicationState)) {
      response.send('INSTALL')
    }
  })

  return app
})
