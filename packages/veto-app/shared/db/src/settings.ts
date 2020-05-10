import { IGunChainReference } from 'gun/types/chain'
const gun = require('./gun')

export const STORE = 'settings'

export type Settings = {
  darkmode?: boolean
  passwordConfirm?: boolean
}

class StoreSettings {
  private gun: IGunChainReference<any>

  constructor() {
    this.gun = gun.get(STORE)
  }

  on(callback: (key: string, value: any) => void) {
    this.gun.map().on((value, key) => {
      callback(key as any, value)
    })
  }

  set(settings: Settings) {
    Object.entries(settings).forEach(([key, value]: [string, any]) => {
      // see Gun API: https://gun.eco/docs/API#-a-name-put-a-gun-put-data-callback-
      this.gun.get(key).put(value as never)
    })
  }

  off() {
    this.gun.map().off()
  }
}

export default StoreSettings
