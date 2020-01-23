# Screen-app

Screen-app is a terminal application used to display on veto hardware monitor.
The information is sourced from veto-backend via websocket and rendered with `blessed`.

To keep this app as responsive and reactive as possible as well as decoupling the view, logic and IO, this app follows common game programming paradigms.
`react` developers should feel at home with the decoupling of view, logic and IO as it is very similar to render & props.
Theses concepts are basically the same in both world.

## Lifecycle

Details of each step the application takes during its lifetime.

### Initialization

During this step the core of the application is booted, the first view appears. It is akin to a loading screen.
Then, the application will retrieve everything it need to run properly, this includes (but is not limited to) :

- Asserts
- Connection to veto-backend
- Various buffers of information to display

### Render loop

Once the initialisation is done, the first data is displayed and the render loop beguins.

The render loop is compromised of two sub-steps:

- Logic
- Render

#### Logic

This is the first par of the loop.
It contain the business logic of the application, like network calls and processing data.
Given the async nature of node, it is important to not duplicate in-flights network call.

Note: To make the consumption of data easier, websocket will be used, this will have the effect of moving the network call out of the logic loop to its own module.
Note: At the beginning, this application will likely receive information exclusively. Sending information might happen at a later stage.

#### Render

This is the last sub-step of the render loop, where we format the data and render it.
This is akin to the render function in `react`.
No business logic should ever be added to the render function.
