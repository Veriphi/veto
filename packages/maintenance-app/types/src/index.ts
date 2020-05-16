export enum State {
  MISSING = 'missing',
  UNKNOWN = 'unknown',
  INSTALLED = 'created',
  RESTARTING = 'restarting',
  RUNNING = 'running',
  PAUSED = 'paused',
  EXITED = 'exited',
}

export type ApplicationState = {
  veto: State
  cyphernode: State
}
