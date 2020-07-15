import Gun from 'gun'
import config from '@veto/config'
import { TRANSACTION_STORE_NAME, Transaction } from './transactions'
import { NOTIFICATION_STORE_NAME, Notification } from './notifications'
import { SETTINGS_STORE_NAME, Settings } from './settings'

type GunClient = {
  [TRANSACTION_STORE_NAME]: Transaction
  [NOTIFICATION_STORE_NAME]: Notification
  [SETTINGS_STORE_NAME]: Settings
}

export default Gun<GunClient>({
  peers: [`http://${window.location.hostname}:${config.port}/gun`],
})
