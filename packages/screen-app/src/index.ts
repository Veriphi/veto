import * as blessed from 'blessed'
import core, { DefaultState } from './core'
import { Widgets } from 'blessed'
import Screen = Widgets.Screen
import BlessedElement = Widgets.BlessedElement

type AppState = DefaultState & {
  logs: string[]
}
type SetState = (newState: Partial<AppState>) => void
type GetState = () => AppState
;(async () => {
  const lifecycle = core<AppState>({
    fps: 30,
    title: 'Veto Screen App',
    // Disable debugging in production
    debug: process.env.NODE_ENV !== 'production',
    logs: [],
  })

  lifecycle.start((screen: Screen, getState, setState) => {
    logComponent(screen, getState, setState)
  })
})()

// TODO: Move into its own file
function logComponent(screen: Screen, getState: GetState, setState: SetState) {
  // Create a box perfectly centered horizontally and vertically.
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    content: 'Veto app',
    tags: true,
    border: {
      type: 'line',
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: '#f0f0f0',
      },
    },
  })

  // append our box to the screen.
  screen.append(box)

  // Simulate a network call with a setInterval
  setInterval(() => {
    onNewLogs('log line ' + Date.now())
  }, 150)

  function onNewLogs(newLine: string) {
    const state = getState()
    const maxLogLength = screen.height
    screen.debug('HEIGHT ' + screen.height)

    state.logs.push(newLine)
    while (state.logs.length > maxLogLength) {
      state.logs.shift()
    }

    render(box, state.logs)

    setState(state)
  }

  function render(box: BlessedElement, logs: string[]) {
    box.setContent(logs.join('\n'))
  }
}
