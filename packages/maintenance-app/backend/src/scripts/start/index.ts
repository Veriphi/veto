import run from '../utils/run'

export default function start(): Promise<string> {
  return run('/start.sh', { SKIP_CYPHERNODE: true })
}
