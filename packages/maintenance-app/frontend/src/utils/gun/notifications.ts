import { nanoid } from 'nanoid'
import { IGunChainReference } from 'gun/types/chain'
import { Transaction } from './transactions'
import gunClient from './index'

export const NOTIFICATION_STORE_NAME = 'notifications'

export type Notification = {
  id: string
  createdAt: string
  transaction: Transaction
}

class StoreNotifications {
  private gun: IGunChainReference<Notification>

  constructor() {
    this.gun = gunClient.get(NOTIFICATION_STORE_NAME)
  }

  add(transaction: Transaction) {
    const id = nanoid()
    const now = new Date()

    const notification = {
      id,
      createdAt: now.toISOString(),
      transaction,
    }

    this.gun.get(id as keyof Notification).put(notification)
  }

  clear(id: string) {
    this.gun.get(id as keyof Notification).put(null as never)
  }

  on(callback: (notification: Notification) => void) {
    this.gun.map().on((notification) => callback(notification))
  }

  off() {
    this.gun.map().off()
  }
}

export default StoreNotifications
