import express, { Application, Request, Response } from 'express'
import config from './utils/config'
import serverSetup from './server'
import getApplicationState from './scripts/getApplicationState'
import appStart from './scripts/start'
import getDockerVersion from './scripts/getDockerVersion'
import { State } from '@maintenance-app/types/src'
import setup from './scripts/setup'

const app = express()

// TODO: Move to ./utils
function isInstalled(state: State): boolean {
  return ![State.UNKNOWN, State.MISSING].includes(state)
}

function shouldInstall(state: State): boolean {
  return state === State.MISSING || state !== State.INSTALLED
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

  app.post('/api/install', async (request: Request, response: Response) => {
    const applicationState = await getApplicationState()

    if (shouldInstall(applicationState.veto)) {
      await setup()
    }

    /*
    if !isRunning
    */
    if (isInstalled(applicationState.veto)) {
      await appStart()
    }

    response.status(204)
    response.end()
  })

  return app
})
