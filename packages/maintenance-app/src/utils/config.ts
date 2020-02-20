import { default as baseConfig, Config as BaseConfig } from '@veto/utils/config'

export type Config = BaseConfig & {}

export default { ...baseConfig, port: process.env.PORT ?? 8181 } as Config
