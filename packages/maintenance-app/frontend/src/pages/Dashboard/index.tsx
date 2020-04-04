import React, { useState } from 'react'
// import { ApplicationState, State } from "@maintenance-app/types/src";

function install() {
  console.log('install')
}

function factoryReset() {
  console.log('factoryReset')
}

export default () => {
  const [applicationState] = useState('running')

  return (
    <div>
      <h1>Veto Maintenance</h1>
      <h3> Application state: {applicationState ?? 'running'}</h3>
      <div>
        Actions
        <button onClick={install}>Install</button>
        <button onClick={factoryReset}>Factory Reset</button>
      </div>
    </div>
  )
}
