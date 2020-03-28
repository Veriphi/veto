import { useState, useEffect } from 'react'
import gun from '../api/gun'

export type Settings = {
  darkmode?: boolean
  passwordConfirm?: boolean
}

export default (): [Settings, Function] => {
  const db = gun.get('settings')
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    db.map().on((value, key) => {
      setSettings((settings) => ({
        ...settings,
        [key]: value,
      }))
    })

    return () => {
      db.map().off()
    }
  }, [db])

  const saveSettings: Function = (settings: Settings) => {
    Object.entries(settings).forEach(([key, value]: [string, any]) => {
      db.get(key).put(value as never)
    })
  }

  return [settings, saveSettings]
}
