import { Application, Request, Response } from 'express'
import getApplicationState from '../scripts/getApplicationState'
import appStart from '../scripts/start'
import { State } from '@maintenance-app/types/src'
import setup from '../scripts/setup'

// TODO: Move to ./utils
function isInstalled(state: State): boolean {
  return ![State.UNKNOWN, State.MISSING].includes(state)
}

function shouldInstall(state: State): boolean {
  return state === State.MISSING || state !== State.INSTALLED
}

export default function installRoute(app: Application): Application {
  app.post('/api/install', async (request: Request, response: Response) => {
    try {
      console.log('api/install')
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
    } catch (error) {
      if (error.toJSON) {
        console.error(error.toJSON())
      } else {
        console.error(error)
      }

      response.status(204)
      response.end()
    }
  })

  return app
}
