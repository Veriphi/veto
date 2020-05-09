import * as path from 'path'
import config from '../../utils/config'
import { execFile } from 'child_process'

export type EnvironmentVariables = {
  [name: string]: boolean | string | number
}

export default function run(script: string, env?: EnvironmentVariables): Promise<string> {
  // need to set the current path properly before starting a script
  const pathToScript: string = path.normalize(config.scriptLocation + script)
  const options = env ? { env: { PATH: process.env.PATH, ...env } } : null

  return new Promise((resolve, reject) => {
    execFile(pathToScript, options, (error, stdout, stderr) => {
      if (stderr) {
        console.error(stderr)
      }

      if (error) {
        console.error(error)
        reject(error)
      }

      if (typeof stdout === 'string') {
        resolve(stdout)
      } else {
        resolve(stdout.toString())
      }
    })
  })
}
