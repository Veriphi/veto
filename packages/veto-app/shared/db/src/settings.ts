import { IGunChainReference } from 'gun/types/chain'
const gun = require('./gun')

export const STORE = 'settings'

export type Settings = {
  darkmode?: boolean
  passwordConfirm?: boolean
}

class StoreSettings {
  private gunInstance: IGunChainReference<any>

  constructor() {
    this.gunInstance = gun.get(STORE)
  }

  on(callback: (key: string, value: any) => void) {
    this.gunInstance.map().on((value, key) => {
      callback(key as any, value)
    })
  }

  set(settings: Settings) {
    Object.entries(settings).forEach(([key, value]: [string, any]) => {
      // see Gun API: https://gun.eco/docs/API#-a-name-put-a-gun-put-data-callback-
      this.gunInstance.get(key).put(value as never)
    })
  }

  off() {
    this.gunInstance.map().off()
  }
}

export default StoreSettings
