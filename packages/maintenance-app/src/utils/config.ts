import { default as baseConfig, Config as BaseConfig } from '@veto/utils/config'

export type Config = BaseConfig & {
  scriptLocation: string
}

export default {
  ...baseConfig,
  port: process.env.PORT ?? 8181,
  scriptLocation: process.env.SCRIPT_LOCATION,
} as Config
