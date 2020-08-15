import { useState, useRef, useEffect } from 'react'
import StoreSettings, { Settings } from '../utils/gun/settings'

export default (): [Settings, Function] => {
  const store = useRef<StoreSettings | null>(null)
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    store.current = new StoreSettings()

    store.current.on((key, value) => {
      setSettings((settings) => ({
        ...settings,
        [key]: value,
      }))
    })

    return () => {
      store.current?.off()
    }
  }, [])

  const saveSettings = (settings: Settings) => store.current?.set(settings)

  return [settings, saveSettings]
}
