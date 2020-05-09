import * as path from 'path'
import config from '../../utils/config'
import { execFile } from 'child_process'

export type EnvironmentVariables = {
  [name: string]: boolean | string | number
}

export default function run(script: string, env?: NodeJS.ProcessEnv): Promise<string> {
  // need to set the current path properly before starting a script
  const pathToScript: string = path.normalize(config.scriptLocation + script)
  const options = env ? { env: { PATH: process.env.PATH, ...env } } : {}

  return new Promise((resolve, reject) => {
    execFile(pathToScript, options, (error, stdout, stderr) => {
      if (stderr) {
        reject(stderr)
      } else if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}
