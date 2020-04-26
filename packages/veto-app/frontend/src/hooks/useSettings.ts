import { useState, useEffect } from 'react'
import { default as gun, settingsDb, Settings } from '@veto/db'

export default (): [Settings, Function] => {
  const instance = gun.get('settings')
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    settingsDb.on(instance, (key, value) => {
      setSettings((settings) => ({
        ...settings,
        [key]: value,
      }))
    })

    return () => settingsDb.off(instance)
  }, [instance])

  const saveSettings = (settings: Settings) => {
    settingsDb.set(instance, settings)
  }

  return [settings, saveSettings]
}
