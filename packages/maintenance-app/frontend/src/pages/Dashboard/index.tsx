import React, { useEffect, useState } from 'react'
import { ApplicationState, State } from '@maintenance-app/types'
import axios from 'axios'
import config from '../../utils/config'
import { throttle } from 'lodash'

const install = throttle(async () => {
  await axios.post(`http://${config.maintenanceBackendUrl}/api/install`)
}, 1500)

async function getApplicationState(): Promise<ApplicationState> {
  const { data }: { data: { state: ApplicationState } } = await axios(`http://${window.location.host}/api/get-info`)
  return data.state
}

type ButtonProps = {
  state: State
  action: () => void
}

/*
State & button chart
| State      | Start   | Install | Reset  |
| ---        | ---     | ---     | ---    |
| MISSING    |         | install |        |
| UNKNOWN    |         | install | reset? |
| INSTALLED  |         |         | reset  |
| RESTARTING |         |         | reset  |
| RUNNING    |         |         | reset  |
| PAUSED     | start   |         | reset  |
| EXITED     | start   |         | reset  |
*/

const INSTALLABLE = [State.MISSING, State.UNKNOWN]
const InstallButton = (props: ButtonProps) => {
  if (INSTALLABLE.includes(props.state)) {
    return (
      <button type="button" onClick={props.action}>
        Install
      </button>
    )
  }

  return (
    <button type="button" disabled>
      Install
    </button>
  )
}

type DashboardState = {
  applicationState: ApplicationState
}

type ApplicationControlProps = {
  start?: () => void
  install: () => void
  factoryReset?: () => void
  applicationState: ApplicationState
}
const ApplicationControls = (props: ApplicationControlProps) => {
  return (
    <div>
      <h3>Application Controls:</h3>
      <InstallButton action={props.install} state={props.applicationState.veto} />
    </div>
  )
}

export default () => {
  const [shouldCheck, setCheck] = useState<boolean>(true)

  useEffect(() => {
    // Toggle the refresh flag every X ms to trigger a call to maintenance-app backend
    const flagToggleIntervalId = setInterval(() => {
      setCheck(!shouldCheck)
    }, config.stateLookupRate)

    // Stop refreshing when the component unmount
    return () => {
      clearInterval(flagToggleIntervalId)
    }
  })

  const [state, setState] = useState<DashboardState>({
    applicationState: {
      veto: State.UNKNOWN,
      cyphernode: State.UNKNOWN,
    },
  })

  useEffect(() => {
    getApplicationState().then((data) =>
      setState((oldState) => {
        return {
          ...oldState,
          applicationState: {
            ...oldState.applicationState,
            ...data,
          },
        }
      }),
    )
  }, [shouldCheck])

  return (
    <div>
      <h1>Veto Maintenance</h1>
      <h3> Application state: </h3>
      <div>
        Veto: {state.applicationState.veto}
        <br />
        Cyphernode: {state.applicationState.cyphernode}
      </div>

      <ApplicationControls applicationState={state.applicationState} install={install} />
    </div>
  )
}
