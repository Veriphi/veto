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
    // see Gun API: https://gun.eco/docs/API#-a-name-map-a-gun-map-callback-
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
      // see Gun API: https://gun.eco/docs/API#-a-name-put-a-gun-put-data-callback-
      db.get(key).put(value as never)
    })
  }

  return [settings, saveSettings]
}
