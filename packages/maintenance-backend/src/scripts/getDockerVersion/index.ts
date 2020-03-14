import run from '../utils/run'

export default function getDockerVersion(): Promise<string> {
  return run('/info/get-docker-version.sh')
}
