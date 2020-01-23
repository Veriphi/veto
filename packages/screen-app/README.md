# Screen-app

Screen-app is a terminal application used to display on veto hardware monitor.
The information is sourced from veto-backend via websocket and rendered with `blessed`.

To keep this app as responsive and reactive as possible as well as decoupling the view, logic and IO, this app follows common game programming paradigms.
`react` developers should feel at home with the decoupling of view, logic and IO as it is very similar to render & props.
Theses concepts are basically the same in both world.

## Lifecycle

Location: `./src/core/index.ts`

Details of each step the application takes during its lifetime.

### Initialization

Location: `./src/init.ts`
During this step the core of the application is booted, the first view appears. It is akin to a loading screen.
Then, the application will retrieve everything it need to run properly, this includes (but is not limited to) :

- Asserts
- Connection to veto-backend
- Various buffers of information to display

### Business logic

Location: & `./src/[componentName]/reducer.ts`
Screen-app respond to socket packets, the application's logic is based on those and is only invoked when suck packets are received.
Upon arrival the state of the application is changed based on the data extracted said packets.
This system is similar to `redux`'s way of managing state.
`[backend] sends <event> => [screen] receive <event> => <event> change <state> => display <state>`

A function will be provided to change the state (similar to react `setState()`)

### Render loop

Location: `./src/core/loop.ts` & `./src/[componentName]/view.ts`
Once the initialisation is done, the first data is displayed and the render loop begins.
This is akin to the render function in `react`, this is where we format the data and render it.
No business logic should ever be added to the render function.

Since the state can be changed multiple times per second, the render loop also acts as a scheduler. It will delay rendering if the state has not changed, and will throttle the rendering if the state is changing too quickly.
