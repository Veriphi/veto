# Veto

## Development

### Requirements

- `yarn`
- `node`
- `git`
- `bash`
- `docker`

### Installation

Clone this repo
`yarn install`

### Start the application

Both front end and back end
`yarn start`

Only front end
`yarn workspace veto-frontend start`

Only back end
`yarn workspace veto-backend start`

### Build the application

To build the application run `./build.sh`

To start the application run `./run.sh`
By default the application is exposed through port 80.

You can now navigate to `localhost` in your webbrowser to use the app.
The api is available at `localhost/api`

### Starting the component library storybook

`yarn workspace component-lib storybook`
