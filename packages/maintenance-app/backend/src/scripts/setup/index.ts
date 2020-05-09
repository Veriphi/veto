import run, { EnvironmentVariables } from '../utils/run'

export default function setup(): Promise<string> {
  const env: EnvironmentVariables = {
    SKIP_CYPHERNODE: true,
  }

  // Needed to find the Dockerfile
  console.log('DOCKER_SOURCE_DIR', process.env.DOCKER_SOURCE_DIR)
  if (process.env.DOCKER_SOURCE_DIR) {
    env.DOCKER_SOURCE_DIR = process.env.DOCKER_SOURCE_DIR
  }

  console.log(env)
  // Script never end, its stuck...
  // It also never go into /setup.sh
  // check if it simply error out or of it hang
  // test with `try catch` first
  try {
    return run('/setup.sh', env)
  } catch (error) {
    console.error(error)
    throw error
  }
}
