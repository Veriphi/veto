import Gun from 'gun'
import config from '@veto/config'

export default Gun({
  peers: [`http://${window.location.hostname}:${config.port}/gun`],
})
