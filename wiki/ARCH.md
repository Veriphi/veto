Architecture
===

```mermaid
graph TD;
  %% Aliases
  client[Client browser]
  vetoFE[Veto Application]
  vetoBE[Veto API]
  vetoScreen[Hardware screen]
  vetoSetupFE[Setup Application]
  vetoSetupBE[Setup API]
  vetoSetup[Setup script]
  cyphernode[Cyphernode API]
  
  %% Veto core application 
  client--> vetoFE
  vetoFE --> vetoBE
  vetoBE --> cyphernode

  %% Veto screen
  vetoScreen --> vetoBE

  %% Veto setup and update
  client --> vetoSetupFE
  vetoSetupFE --> vetoSetupBE
  vetoSetupBE --> vetoSetup
  vetoFE --> vetoSetupFE
```

## Key points
* Backend serve front-end as static content
* Aside from serving static context, the backend is purely an API

### Difference between dev & prod
#### Serving the front end
In dev, the front-end has its own server with `hot-reload` and `watch` capability. The backend serves it using a proxy.

In prod, the front-end is fully static. The backend statically serve theses files instead of using a proxy.

