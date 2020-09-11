# Veto app

Self-hosted Web Dashboard that connects with Cyphernode and related Bitcoin software to simplify the management, deployment of a Bitcoin Core Node and related software. It first begins with a setup of creating a password and choosing the configuration, deploys cyphernode after that and directs towards the main application where users can add / remove web front-end applications or back-end servers to connect his wallet with a Bitcoin Node or use a self-hosted explorer, etc. 

During the setup, maintenance app will:

- Install required dependencies (ie: docker)
- Run cyphernode setup script
- Download veto docker images
- Run veto docker containers

### Access level

Due to the natures of its feature, Veto need to run on the host's system where it can manage docker and system dependencies.
It also run with a special user that has access to docker and a subset of folders to manage each applications.

### Features:

Main Features
- Connecting Bitcoin Node to Wallets (e.g. Blockstream Green, BRD, Wasabi) 
- Deployment of Cyphernode
- Spark Wallet (Lightning Web) 
- Sifir Web App (To setup Sifir Mobile App) 

Maintenance Features
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
