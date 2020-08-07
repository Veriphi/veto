import run from '../utils/run'

export default function setupSifir(): Promise<string> {
  console.log('setupSifirScripts')
  return run('/sifir.sh')
}
