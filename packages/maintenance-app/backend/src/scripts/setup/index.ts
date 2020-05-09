import run from '../utils/run'

export default function setup(): Promise<string> {
  const env: NodeJS.ProcessEnv = {
    SKIP_CYPHERNODE: 'true',
  }

  // Needed to find the Dockerfile
  if (process.env.DOCKER_SOURCE_DIR) {
    env.DOCKER_SOURCE_DIR = process.env.DOCKER_SOURCE_DIR
  }

  // Script never end, its stuck...
  // It also never go into /setup.sh
  // check if it simply error out or of it hang
  // test with `try catch` first
  return run('/setup.sh', env)
}
