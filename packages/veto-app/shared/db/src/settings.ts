import { IGunChainReference } from 'gun/types/chain'

export type Settings = {
  darkmode?: boolean
  passwordConfirm?: boolean
}

const on = (gun: IGunChainReference<any>, callback: (key: string, value: any) => void) => {
  gun.map().on((value, key) => {
    callback(key as any, value)
  })
}

const set = (gun: IGunChainReference<any>, settings: Settings) => {
  Object.entries(settings).forEach(([key, value]: [string, any]) => {
    // see Gun API: https://gun.eco/docs/API#-a-name-put-a-gun-put-data-callback-
    gun.get(key).put(value as never)
  })
}

const off = (gun: IGunChainReference<any>) => gun.map().off()

export default {
  on,
  set,
  off,
}
