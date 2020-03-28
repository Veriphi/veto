# Architecture

Research and development refers to innovative activities in developing or improving services or products. It constitutes the first stage of development of a potential new service or the production process.

```mermaid
graph LR;
  %% Aliases
  user((User))
  vetoFE[Veto Frontend]
  vetoBE[Veto Backend]
  vetoScreen[Screen App]
  maintenanceFE[Maintenance Frontend]
  maintenanceBE[Maintenance Backend]
  scripts[Veto Scripts]
  cyphernode[Cyphernode API]

  %% Veto setup and update
  user -- Interact With --> maintenanceFE
  subgraph Maintenance-App
  maintenanceFE --> maintenanceBE
  end

  maintenanceBE --> scripts

  %% Veto core application
  user -- Interact With --> vetoFE

  subgraph Veto-App
    vetoFE --> vetoBE
    vetoFE -- Redirect To --> maintenanceFE
  end

  vetoBE --> cyphernode

  %% Veto screen
  user -. View .-> vetoScreen
  vetoScreen --> vetoBE
```

![Architecture](./graphs/arch.svg)
<img alt="Architecture" src="./graphs/arch.svg" />

## Key points

- Backend serve front-end as static content
- Aside from serving static content, the backend is purely an API

### Difference between dev & prod

#### Serving the front end

In dev, the front-end has its own server with `hot-reload` and `watch` capability. The backend serves it using a proxy.

In prod, the front-end is fully static. The backend statically serve theses files instead of using a proxy.

## Backend Structure

The folder structure is used to make a distinction between route implementation `api/*` and core server utils `server/*`
This has the effect of making tests easy as routes do not depend on server.

- `routes/` Contains veto routes, each file is a route veto-frontend can call to. \* `getActiveWatches.ts` handle the request (call upstream api, handle errors, format messages, etc)
- `api/` Contains api calls, sub-folders are grouped by upstream service
  - `cyphernode/` Group all calls to cyphernode, each file in this folder handle one call to cyphernode
    - `getActiveWatches.ts` make a `get` call to cyphernode `activewatches` endpoint
    - `client.ts` Provide an axios client with everything needed to call cyphernode
- `server/` Holds all core server code
  - `middlewares/` Group all middlewares used in this app, each file contain one middleware
    - `index.ts` Setup all middlewares in order
  - `serveFrontend.ts` (might be moved later) Serve static files. Used to serve veto-frontend
  - `index.ts` Brings all parts of the server together (middleware, api routes, serve frontend, etc)
- `utils/` Holds all utils used in the whole app (ex: config & logging)

## Communication

### Typical E2E communication

```mermaid
sequenceDiagram
    User->>+Veto Frontend: Interact with Front end
    Veto Frontend->>+Veto Backend: Call API
    Veto Backend->>+Cyphernode: Call API
    Cyphernode-->>-Veto Backend: Respond
    Veto Backend-->>-Veto Frontend: Respond
    Veto Frontend-->>-User: Display updated UI
```

![Typical End To End Veto App](./graphs/e2e-veto.svg)
<img alt="Typical End To End Veto App" src="./graphs/e2e-veto.svg" />

### E2E communication from Veto Screen

```mermaid
sequenceDiagram
    User->>Maintenance Frontend: Change Screen settings or request sensitive information
    Maintenance Frontend->>Maintenance Backend: Call API
    Maintenance Backend->>Screen App: Communication (might be http OR websocket)
    Screen App-->>User: Display updated informations
```

![End To End Screen App communication](./graphs/e2e-screen.svg)
<img alt="End To End Screen App communication" src="./graphs/e2e-screen.svg" />
