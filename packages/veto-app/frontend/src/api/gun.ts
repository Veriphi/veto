import Gun from 'gun/gun'

export default Gun({
  peers: [`http://${window.location.hostname}:8080/gun`],
})
