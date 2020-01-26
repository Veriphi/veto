# Veto

## Development

### Requirements

- `yarn`
- `node`
- `git`
- `bash`
- `docker`

### Installation

- Clone this repo
- `yarn install`

### Start the application

#### Veto

Run this command at the root of the project to start both front-end and back-end,
`yarn start`

Only front end
`yarn workspace veto-frontend start`

Only back end
`yarn workspace veto-backend start`

##### Config

Configuration is provided through environment variables.
Each variables can be found in the config file `./packages/veto-backend/src/utils/config.ts`

#### cyphernode

##### Credentials

Cyphernode dev credentials are

- Username: `veriphi-dev`
- Password: `veriphirocks!`

##### Run cyphernode

From the root of the project, run the following commands:

- `cd cyphernode`
- `CFG_PASSWORD=veriphirocks! ./setup.sh -irc`

When the setup is completed, start cyphernode with the start script

- `./start.sh`

### Build the application

To build the application run `./build.sh`
This will build veto's docker image and run cyphernode's setup script

To start the application run `./run.sh`
This will start veto and cyphernode
By default the application is exposed through port 80.

You can now navigate to `localhost` in your web browser to use the app.
The api is available at `localhost/api`

### Starting the component library storybook

`yarn workspace component-lib storybook`

### Rules

- API urls in `veto-backend` always start with `api/` to separate them from the static files which are on `/`
- Static file path in `veto-frontend` can't start with `api/`, this is to prevent route resolution problems with `veto-backend`.
