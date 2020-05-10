import { useState, useRef, useEffect } from 'react'
import { StoreNotifications, Notification, Transaction } from '@veto/db'

type NotificationsHook = () => [
  { [key: string]: Notification },
  (transaction: Transaction) => void,
  (id: string) => void,
]

const useNotifications: NotificationsHook = () => {
  const store = useRef<StoreNotifications | null>(null)
  const [notifications, setNotifications] = useState<{ [key: string]: Notification }>({})

  useEffect(() => {
    store.current = new StoreNotifications()

    store.current.on((notification) => {
      setNotifications((notifications) => ({
        ...notifications,
        [notification.id]: notification,
      }))
    })

    return () => {
      store.current?.off()
    }
  }, [])

  const add = (transaction: Transaction) => {
    store.current?.add(transaction)
  }

  const clear = (id: string) => {
    store.current?.clear(id)
  }

  return [notifications, add, clear]
}

export default useNotifications
