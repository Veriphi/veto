export enum ENV {
  dev = 'dev',
  production = 'production',
  qa = 'qa',
}

export type Config = {
  version: string
  port: number
  environment: ENV
}

export default {
  // Veto version number
  version: `0.0.0`,
  environment: process.env.NODE_ENV ?? 'dev',
} as Config
