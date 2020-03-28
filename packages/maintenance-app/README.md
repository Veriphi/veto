# Maintenance app

Starting point of the installation process. If you own a Veto box, this application is pre-installed on the hardware.
When it is used for the first time, it will ask the user to create credentials for Veto and will prompt the user to backup its wallet keys, after which the application setup can begin.

During the setup, maintenance app will:

- Install required dependencies (ie: docker)
- Run cyphernode setup script
- Download veto docker images
- Run veto docker containers
- Download screen-app docker images
- Run screen-app docker containers
  The maintenance app remain available for debugging and support purposes.

### Access level

Due to the natures of its feature, maintenance-app need to run on the host's system where it can manage docker and system dependencies.
It also run with a special user that has access to docker and a subset of folders to manage each applications.

### Features:

- Factory reset
- Veto installation
- Display application state
- Display Veto logs
- Application settings

## Maintenance-app backend

Web service that manage veto application

### Tech stack

- Runtime: Nodejs
- Language: Typescript
- Test runner: Jest
- Web server: Express (behind nginx reverse proxy)

### Architecture

#### Folder

- `src/`
  - `scripts/`
    - `*/` Hold code that access scripts on the host system.
  - `routes/`
    - `*.ts` Routes exposed for consumption to the frontend. Each file contains one route.
    - `index.ts` Register all routes
  - `server/`
    - Contains the orchestration between the incoming request and the `routes`
  - `utils/`
    - Contains utilities and helpers

## Maintenance-App frontend

User facing application that communicate to maintenance-app backend to provider features to the user.

### Tech stack

- Runtime: Browser
- Language: Typescript
- Test runner: Jest
- UI framework: React
- Boilerplate: create-react-app
