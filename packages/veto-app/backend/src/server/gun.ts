import Gun from 'gun'
import { IGunChainReference } from 'gun/types/chain'
import { Server } from 'http'

let instance: IGunChainReference

const getInstance = (): IGunChainReference => {
  if (!instance) {
    throw new Error('Gun instance not initialized. Please call init() before.')
  }

  return instance
}

const init = (server: Server, filePath: string): Server => {
  instance = Gun({
    web: server,
    file: filePath,
  })

  return server
}

export default {
  init,
  getInstance,
}
