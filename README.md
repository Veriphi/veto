# Veto

## Development

### Requirements

- `yarn`
- `node`
- `git`
- `bash`
- `docker`

### Structure

We use yarn workspaces to split the codebase into packages.
Each packages are located in the `packages/` folder.

#### Convention

- Packages under the `packages/shared/` folder are meant to be shared across application and library.
- Packages matching `packages/*-app` are self contained applications and should not be shared across packages.
- Packages matching `packages/veto-*` are part of the veto application and should not be shared across packages.
  - _At some point we might move them to `packages/veto/*`_

### Installation

- Clone this repo
- `yarn install`

### Start the application

#### Running in dev mode

##### If this is your first time running cyphernode + veto:

From the root of the project:

1. `yarn cyphernode:setup`
   This will setup cyphernode using the default dev client.7z and config.7z

2. `yarn dev`
   This will start cyphernode along with veto-backend and veto-frontend.
   The backend will be accessible on `localhost:8080` and will serve the frontend at `/`
   The frontend will be accessible with hot module reloading on `localhost:3000`

3. `yarn cyphernode:stop` When you are done devving (the cyphernode dockers consume a lot of ressources so)

See the Cyphernode setup section below for more information.

##### If you've already setup cyphernode:

`yarn dev`
This will start cyphernode along with veto-backend and veto-frontend.
The backend will be accessible on `localhost:8080` and will serve the frontend at `/`
The frontend will be accessible with hot module reloading on `localhost:3000`

Remember to call `yarn cyphernode:stop` when you are finished or the whole cyphernode suite of containers will continue running.

#### Veto only scripts

Run this command at the root of the project to start both front-end and back-end,
`yarn start`

Screen app need to be started independently as it capture the whole terminal and would collide with backend & frontend logs
`yarn start:screen`

To run front end on its own
`yarn start:veto:frontend`

To run back end on its own
`yarn start:veto:backend`

##### Config

Configuration is provided through environment variables.
Each variables can be found in the config file `./packages/veto-backend/src/utils/config.ts`

#### Cyphernode

##### Setup cyphernode

From the root of the project, run the following commands:

- `yarn cyphernode:setup`

##### Start cyphernode

When the setup is completed, start cyphernode with the start script

- `yarn cyphernode:start`

##### Credentials

Cyphernode dev credentials are

- Username: `veriphi-dev`
- Password: `veriphirocks!`

### Build the application

To build the application run `./scripts/setup.sh`
This will build veto's docker image and run cyphernode's setup script
Options:
| Name | Default | Values | Description |
| --- | --- | --- | --- |
| `CFG_PASSWORD` | `""` | Any string | Password used to seal Cypherdone's config.7z file |
| `SKIP_CYPHERNODE` | `"false"` | `"false" || "false"` | If `true`, cyphernode will not be built |
| `VERSION_NUMBER` | `"latest"` | Any string | Version used to tag both `veto` & `veto-screen` docker image |

To start the application run `./scripts/start.sh`
This will start veto and cyphernode
By default the application is exposed through port 80.
| Name | Default | Values | Description |
| --- | --- | --- | --- |
| `START_SCREEN` | `"false"` | `"false" || "false"` | If `true`, `veto-screen` will be started after `veto` |
| `SKIP_CYPHERNODE` | `"false"` | `"false" || "false"` | If `true`, cyphernode will not be built |
| `VERSION_NUMBER` | `"latest"` | Any string | Version used to tag both `veto` & `veto-screen` docker image |

You can now navigate to `localhost` in your web browser to use the app.
The api is available at `localhost/api`

### Rules

- API urls in `veto-backend` always start with `api/` to separate them from the static files which are on `/`
- Static file path (frontend files) can't start with `api/`, this is to prevent route resolution problems with `veto-backend`.
