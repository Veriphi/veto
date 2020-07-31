import { IGunChainReference } from 'gun/types/chain'
import gunClient from './index'

export const SETTINGS_STORE_NAME = 'settings'

export type Settings = {
  darkmode?: boolean
  passwordConfirm?: boolean
}

class StoreSettings {
  private gun: IGunChainReference<Settings>

  constructor() {
    this.gun = gunClient.get(SETTINGS_STORE_NAME)
  }

  on(callback: (key: string, value: any) => void) {
    this.gun.map().on((value, key) => {
      callback(key, value)
    })
  }

  set(settings: Settings) {
    Object.entries(settings).forEach(([key, value]: [string, any]) => {
      // see Gun API: https://gun.eco/docs/API#-a-name-put-a-gun-put-data-callback-
      this.gun.get(key as keyof Settings).put(value)
    })
  }

  off() {
    this.gun.map().off()
  }
}

export default StoreSettings
