# Veto

Veto is a self hosted bitcoin node built on top of `cyphernode`.
It supports:
_ Sending funds
_ Creating wallets
_ Notifications
_ ...

## Veto-app backend

Web service that uses cyphernode capabilities to deliver features to the user.

### Tech stack

- Runtime: Nodejs
- Language: Typescript
- Test runner: Jest
- Web server: Express

### Architecture

#### Folder

- `src/`
  - `api/`
    - `*.ts` Hold api calls made to backing services, Each file is limited to one call.
  - `routes/`
    - `*.ts` Routes exposed for consumption to the frontend. Each file contains one route.
    - `index.ts` Register all routes
  - `server/`
    - Contains the orchestration between the incoming request and the `routes`
  - `utils/`
    - Contains utilities and helpers

## Veto-App frontend

User facing application that communicate to veto-app backend to provider features to the user.

### Tech stack

- Runtime: Browser
- Language: Typescript
- Test runner: Jest
- UI framework: React
- Boilerplate: create-react-app

### Architecture

#### Folder

- `src/`
  - `components/`
    - `molecules/`
      - `*/` UI components containing business logic
  - `hooks/`
    - `*.ts` Reach hooks
  - `pages/`
    - `*/` Contains pages of the application
  - `utils/`
    - Contains utilities and helpers
