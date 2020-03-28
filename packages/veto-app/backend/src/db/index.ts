import Gun from 'gun'
import { IGunChainReference } from 'gun/types/chain'
import { Server } from 'http'
import config from '../utils/config'

let instance: IGunChainReference

const getInstance: Function = (): IGunChainReference => {
  if (!instance) {
    throw new Error('Gun instance not initialized. Please call init() before.')
  }

  return instance
}

const init: Function = (server: Server): IGunChainReference => {
  instance = Gun({
    web: server,
    file: config.db.file,
  })

  return instance
}

export default {
  init,
  getInstance,
}
