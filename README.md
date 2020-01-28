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

Screen app need to be started independently as it capture the whole terminal and would collide with backend & frontend logs
`yarn start:screen`

To run front end on its own
`yarn start:frontend`

To run back end on its own
`yarn start:backend`

##### Config

Configuration is provided through environment variables.
Each variables can be found in the config file `./packages/veto-backend/src/utils/config.ts`

#### Cyphernode

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
Options:
| Name | Default | Values | Description |
| --- | --- | --- | --- |
| `CFG_PASSWORD` | `""` | Any string | Password used to seal Cypherdone's config.7z file |
| `SKIP_CYPHERNODE` | `"false"` | `"false" || "false"` | If `true`, cyphernode will not be built |
| `VERSION_NUMBER` | `"latest"` | Any string | Version used to tag both `veto` & `veto-screen` docker image |

To start the application run `./run.sh`
This will start veto and cyphernode
By default the application is exposed through port 80.
| Name | Default | Values | Description |
| --- | --- | --- | --- |
| `START_SCREEN` | `"false"` | `"false" || "false"` | If `true`, `veto-screen` will be started after `veto` |
| `SKIP_CYPHERNODE` | `"false"` | `"false" || "false"` | If `true`, cyphernode will not be built |
| `VERSION_NUMBER` | `"latest"` | Any string | Version used to tag both `veto` & `veto-screen` docker image |

You can now navigate to `localhost` in your web browser to use the app.
The api is available at `localhost/api`

### Starting the component library storybook

`yarn workspace component-lib storybook`

### Rules

- API urls in `veto-backend` always start with `api/` to separate them from the static files which are on `/`
- Static file path (frontend files) can't start with `api/`, this is to prevent route resolution problems with `veto-backend`.
