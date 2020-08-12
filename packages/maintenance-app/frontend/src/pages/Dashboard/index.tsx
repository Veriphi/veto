import React, { useEffect, useState, FunctionComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import { ApplicationState, State } from '@maintenance-app/types'
import { Button, Text } from '@veriphi/veto-ui'
import axios from 'axios'
import config from '../../utils/config'
import useSettings from '../../hooks/useSettings'
import { throttle } from 'lodash'
import BitcoinOnionButton from '../../components/molecules/BitcoinOnionButton'
import { setupSifir } from '../../api'
import DashboardCard from '../../components/molecules/DashboardCard'
import sparkImage from '../../public/spark.png'
/*
import greenImage from '../../public/green.png'
import lightningImage from '../../public/lightning.png'
import bitcoinImage from '../../public/bitcoin.png'
import cyphernodeImage from '../../public/cyphernode.png'
import vetoImage from '../../public/veto.png'
import sifirImage from '../../public/sifir.png'
*/

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

const Dashboard: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  const [settings, setSettings] = useSettings()

  const toggleDarkMode = () => {
    setSettings({ darkmode: !settings.darkmode })
  }

  const [shouldCheck, setCheck] = useState<boolean>(true)

  useEffect(() => {
    document.body.style.backgroundColor = settings.darkmode ? '#000' : '#fff'
  }, [settings])

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
      <Text variant="heading1">Welcome to Your Dashboard, Gustavo </Text>
      <h3> Application state: </h3>
      <div>
        Veto: {state.applicationState.veto}
        <br />
        Cyphernode: {state.applicationState.cyphernode}
      </div>

      <ApplicationControls applicationState={state.applicationState} install={install} />
      <Button variant="primary" onClick={toggleDarkMode}>
        {settings.darkmode ? 'Light Mode' : 'Dark Mode'}
      </Button>
      <BitcoinOnionButton></BitcoinOnionButton>
      <Button variant="primary" onClick={setupSifir}>
        {' '}
      </Button>
      <DashboardCard
        image={sparkImage}
        name="Spark Wallet"
        version="2.14"
        click={'/sparkwallet/#/'}
        title={'SPARK WALLET'}
      />
    </div>
  )
}

export default Dashboard

//

//CHANGE LOCATION.HREF TO SOMETHING BETTER

/*

      <DashboardCard  image={bitcoinImage} name="Bitcoin Core" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={lightningImage} name="c-lightning" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={sifirImage} name="Sifir" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={cyphernodeImage} name="Cyphernode" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={greenImage} name="Green Wallet" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      <DashboardCard  image={vetoImage} name="Veto" version="2.14" click={(event : string) => (window.location.href = '/sparkwallet/#/')} title={"SPARK WALLET"} />
      
*/
