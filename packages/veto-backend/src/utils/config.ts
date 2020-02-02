enum ENV {
  dev = 'dev',
  prod = 'prod',
  qa = 'qa',
}

export type Config = {
  version: string
  port: number
  environment: ENV
  cyphernode: {
    gatewayUrl: string
    user: string
    password: string
    pathToCert: string
    key: string
    keyId: string
  }
}

export default {
  // Veto version number
  version: `0.0.0`,
  // Veto's listening port
  port: process.env.PORT ?? 8080,
  environment: process.env.NODE_ENV ?? 'dev',
  cyphernode: {
    // Gateway url used to communicate with cyphernode's ecosystem
    gatewayUrl: 'https://localhost:2009/v0/',
    // Gateway user provided during cyphernode setup process
    user: process.env.CYPHERNODE_USER ?? 'veriphi-dev',
    // Gateway password provided during cyphernode setup process
    password: process.env.CYPHERNODE_PSW ?? 'veriphirocks!',
    // Path to pem file generated during cyphernode setup process (usually located in `./client.7z`0
    pathToCert: process.env.PATH_TO_CYPHERNODE_CERT ?? '../../cyphernode/cacert.pem',
    // Key generated during cyphernode setup process (one of the three found in `./client.7z`)
    key: process.env.CYPHERNODE_KEY ?? '7855ff4745631122f30def3ab6deb84dcbc2a17cb5a5e4dac40c41ba37fed0f7',
    // Id associated with the cyphernode key passed to veto
    keyId: process.env.CYPHERNODE_KEY_ID ?? '000',
  },
} as Config
