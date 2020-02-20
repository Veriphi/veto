import run from '../utils/run'

export enum State {
  RUNNING = 'running',
  STOPPED = 'stopped',
  MISSING = 'missing',
  INSTALLED = 'installed',
  UNKNOWN = 'unknown',
}

const STATE_VALUES = Object.values(State)

export type ApplicationState = {
  veto: State
  cyphernode: State
}

/**
 * Validate potentialState is a valid State, if not, return State.UNKNOWN
 */
function sanitize(potentialState: string | State): State {
  return STATE_VALUES.includes(potentialState as State) ? (potentialState as State) : State.UNKNOWN
}

export default function getApplicationState(): Promise<ApplicationState> {
  return run('/info/get-application-state.sh').then((rawStates: string) => {
    const states = rawStates.replace('\n', '').split(',')
    console.log('STATE_VALUES', STATE_VALUES)
    console.log('rawStates', rawStates)
    console.log('states', states)

    return {
      veto: sanitize(states[0]),
      cyphernode: sanitize(states[1]),
    }
  })
}
