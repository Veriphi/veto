import { default as baseConfig, Config as BaseConfig } from '@veto/config'

export type Config = BaseConfig & {
  appName: string
  scriptLocation: string
}

export default {
  ...baseConfig,
  appName: 'Maintenance App',
  port: process.env.PORT ?? 8181,
  scriptLocation: process.env.SCRIPT_LOCATION,
} as Config
