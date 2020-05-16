import run from '../utils/run'
import { ApplicationState, State } from '@maintenance-app/types/src'

const STATE_VALUES = Object.values(State)

type DockerInstanceState = {
  Status: State
  Running: boolean
  Paused: boolean
  Restarting: boolean
  OOMKilled: boolean
  Dead: boolean
  Pid: number
  ExitCode: number
  Error: string
  StartedAt: string
  FinishedAt: string
}
type RawApplicationState = { [name: string]: DockerInstanceState }

/**
 * Validate potentialState is a valid State, if not, return State.UNKNOWN
 */
function sanitize(potentialState: string | State): State {
  return STATE_VALUES.includes(potentialState as State) ? (potentialState as State) : State.UNKNOWN
}

function toJson(rawJSON: string) {
  try {
    return JSON.parse(rawJSON)
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default function getApplicationState(): Promise<ApplicationState> {
  return run('/info/get-application-state.sh').then((rawStates: string) => {
    // Convert all json strings to js objects and flatten
    // them into one object with all states
    const states = rawStates
      .split('\n')
      .filter((text) => !!text)
      .map(toJson)
      .reduce((acc, state) => ({
        ...acc,
        ...state,
      })) as RawApplicationState

    // Extract cyphernode state
    const cyphernodeStates = Object.keys(states)
      .filter((name) => name.indexOf('cyphernode') === 0) // find instance with name starting with cyphernode
      .map((instanceName) => states[instanceName].Status) // get all instance state

    let cyphernodeState = State.UNKNOWN

    // If there is not cyphernode instance present, the state is unknown
    if (cyphernodeStates.length === 0) {
      cyphernodeState = State.UNKNOWN

      // If one part of cyphernode is down, the whole thing is considered down
    } else if (cyphernodeStates.includes(State.EXITED)) {
      cyphernodeState = State.EXITED

      // Cyphernode is compromised of 8 containers, if one is missing the installation is missing
    } else if (cyphernodeStates.length < 8) {
      cyphernodeState = State.MISSING

      // If all container are running at the same time, the application is considered running
    } else if (
      cyphernodeStates.join(',') ===
      [
        State.RUNNING,
        State.RUNNING,
        State.RUNNING,
        State.RUNNING,
        State.RUNNING,
        State.RUNNING,
        State.RUNNING,
        State.RUNNING,
      ].join(',')
    ) {
      cyphernodeState = State.RUNNING

      // At this point, not all container are running, if we still have all 8 container we can safely state the application is installed regardless of its internal state
    } else if (cyphernodeStates.length === 8) {
      cyphernodeState = State.INSTALLED

      // If all else fails, we don't know the state of the application, mark the state as unknown
    } else {
      cyphernodeState = State.UNKNOWN
    }

    return {
      veto: sanitize(states['veto']?.Status),
      cyphernode: sanitize(cyphernodeState),
    }
  })
}
