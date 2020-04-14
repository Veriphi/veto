import React, { useEffect, useState } from 'react'
import { ApplicationState, State } from '@maintenance-app/types'
import axios from 'axios'

function install() {
  console.log('install')
}

function factoryReset() {
  console.log('factoryReset')
}

async function getApplicationState(): Promise<ApplicationState> {
  const { data }: { data: { state: ApplicationState } } = await axios(`http://${window.location.host}/api/get-info`)
  console.log('applicationState', data.state)
  return data.state
}

type DashboardState = {
  applicationState: ApplicationState
}

export default () => {
  const [incrementA, setIncrementA] = useState<number>(0)
  const [incrementB, setIncrementB] = useState<number>(0)

  useEffect(() => {
    console.log('incrementA', incrementA)

    setIncrementA(incrementA + 1)
  }, [incrementA])

  // console.log("== Dashboard component");
  //
  // const [shouldCheck, setCheck] = useState<boolean>(true);
  //
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCheck(!shouldCheck);
  //   }, 3000);
  //
  //   return () => {
  //     clearInterval(id);
  //   };
  // });
  //
  //
  const state = {
    applicationState: {
      veto: State.UNKNOWN,
      cyphernode: State.UNKNOWN,
    },
  }
  // const [state, setState] = useState<DashboardState>({
  //   applicationState: {
  //     veto: State.UNKNOWN,
  //     cyphernode: State.UNKNOWN
  //   }
  // });
  //
  // useEffect(() => {
  //   console.log("Using effect");
  //   getApplicationState()
  //     .then((data) => setState(oldState => {
  //       return {
  //         ...oldState,
  //         applicationState: {
  //           ...oldState.applicationState,
  //           ...data
  //         }
  //       };
  //     }));
  //   // });
  // }, [shouldCheck]);

  return (
    <div>
      <button onClick={() => setIncrementA(incrementA + 1)}>INCREMENT A</button>
      <button onClick={() => setIncrementB(incrementB + 1)}>INCREMENT B</button>
      <h1>Veto Maintenance</h1>
      <h3> Application state: </h3>
      <div>
        Veto: {state.applicationState.veto}
        <br />
        Cyphernode: {state.applicationState.cyphernode}
      </div>
      <div>
        Actions
        <button onClick={() => install()}>Install</button>
        <button onClick={factoryReset}>Factory Reset</button>
      </div>
    </div>
  )
}
