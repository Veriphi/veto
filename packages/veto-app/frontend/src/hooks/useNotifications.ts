import { useState, useRef, useEffect } from 'react'
import { StoreNotifications, Notification } from '@veto/db'

export default () => {
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
      store.current && store.current.off()
    }
  }, [])

  const add = (message: string) => store.current && store.current.add(message)
  const clear = (id: string) => store.current && store.current.clear(id)

  return [notifications, add, clear]
}
