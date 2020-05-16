import { default as baseConfig, Config as BaseConfig } from '@veto/config'

export type Config = BaseConfig & {
  appName: string
  stateLookupRate: number
  maintenanceBackendUrl: string
}

const getBackendUrl = () => {
  const port = process.env.MAINTENANCE_PORT || 8181
  return `${window.location.hostname}:${port}/`
}

export default {
  ...baseConfig,
  appName: 'Maintenance App',
  stateLookupRate: 3000,
  maintenanceBackendUrl: getBackendUrl(),
} as Config
