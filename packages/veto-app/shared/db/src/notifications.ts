import { nanoid } from 'nanoid'
import { IGunChainReference } from 'gun/types/chain'
const gun = require('./gun')

export const STORE = 'notifications'

export type Notification = {
  id: string
  createdAt: Date
  message: string
}

class StoreNotifications {
  private gunInstance: IGunChainReference<any>

  constructor() {
    this.gunInstance = gun.get(STORE)
  }

  add(message: string) {
    const id = nanoid()
    const now = new Date()

    const notification = {
      id,
      createdAt: now,
      message,
    }

    this.gunInstance.get(id).put(notification as never)
  }

  clear(id: string) {
    this.gunInstance.get(id).put(null as never)
  }

  on(callback: (notification: Notification) => void) {
    this.gunInstance.map().on((notification) => callback(notification as Notification))
  }

  off() {
    this.gunInstance.map().off()
  }
}

export default StoreNotifications
