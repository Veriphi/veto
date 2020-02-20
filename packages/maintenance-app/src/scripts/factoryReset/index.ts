import run from '../utils/run'

export default function factoryReset(): Promise<string> {
  return run('/factory-reset.sh')
}
