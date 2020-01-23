import { default as blessed, Widgets } from 'blessed'
import Screen = Widgets.Screen

export type DefaultState = {
  fps: number
  title: string //`Veto Screen App`,
  debug: boolean
}

class Core<S extends DefaultState> {
  private name = 'CORE'
  private screen?: Screen
  private state: S
  private lastState: S

  // Debug variables
  private startTime?: number

  constructor(defaultState: S) {
    this.state = this.lastState = defaultState
  }

  // Important to be an arrow function to keep reference to `this`
  // Will accept any new state as long as its structure is a subset of the full state structure
  private setState = (newState: Partial<S>): void => {
    this.screen?.debug(`${Date.now() - (this.startTime ?? 0)} name = ${this.name}`)
    this.screen?.debug(`${Date.now() - (this.startTime ?? 0)} Setting new state`)
    if (this.state !== newState) {
      this.state = {
        ...this.state,
        ...newState,
      }
    }
  }

  private getState = (): S => {
    // Return a copy of the state to prevent mutating this.lastState
    return {
      ...this.state,
    }
  }

  // Orchestrate the lifecycle
  async start(
    appInit?: (screen: Screen, getState: () => S, setState: (newState: Partial<S>) => void) => void,
  ): Promise<void> {
    // Will all the appInit callback when the initiation is completed
    await this.init().then((screen: Screen) => {
      if (appInit) {
        appInit(screen, this.getState, this.setState)
      }
    })

    const msDelayBetweenRender = 1000 / this.state.fps
    this.screen?.debug(`${Date.now() - (this.startTime ?? 0)} Setting loop interval to ${msDelayBetweenRender}ms`)

    // TODO: Feature: Add a scheduler with delta time offset for smooth animation and pause
    // TODO: Feature: Add pause/delay (might be useful to display message/warning/errors
    setInterval(() => {
      // Do not waste cpu time if the state has not changes

      // @ts-ignore
      this.screen?.debug(
        `${Date.now() - (this.startTime ?? 0)} : Is state new? ${this.state !== this.lastState} \n ${
          this.state.logs.length
        } vs ${this.lastState.logs.length}`,
      )
      if (this.state !== this.lastState) {
        this.screen?.debug(`${Date.now() - (this.startTime ?? 0)} New state, rendering...`)
        this.lastState = this.state
        this.screen?.render()
      } else {
        this.screen?.debug(`${Date.now() - (this.startTime ?? 0)} Old state, skip rendering.`)
      }
    }, msDelayBetweenRender)
  }

  // Initialise the core of the application
  private async init(): Promise<Screen> {
    // Create a screen object.
    this.screen = blessed.screen({
      smartCSR: true,
      debug: this.getState().debug,
    })

    if (this.getState().debug) {
      this.startTime = Date.now()

      // Quit on Escape, q, or Control-C.
      this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0)
      })
    }

    // Render the screen
    this.screen.render()

    return this.screen
  }
}

// Singleton core, we can only have one application lifecycle
// Use any as this type is fully encapsulated by the default export function
let core: any
export default <S extends DefaultState>(defaultState: S): Core<S> => {
  if (!core) {
    // TODO: Add config
    core = new Core<S>(defaultState)
  }

  // Important typing to encapsulate the any we used for `core`
  // This is not ideal as the type changes with each execution but the actual shape of the object will remain the same
  return core as Core<S>
}
