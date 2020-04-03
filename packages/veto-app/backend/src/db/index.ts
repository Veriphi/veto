import Gun from 'gun'
import { IGunChainReference } from 'gun/types/chain'
import { Server } from 'http'
import config from '../utils/config'

let instance: IGunChainReference

const getInstance = (): IGunChainReference => {
  if (!instance) {
    throw new Error('Gun instance not initialized. Please call init() before.')
  }

  return instance
}

const init = (server: Server): Server => {
  instance = Gun({
    web: server,
    file: config.db.filePath,
  })

  return server
}

export default {
  init,
  getInstance,
}
