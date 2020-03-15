import * as path from 'path'
import config from '../../utils/config'
import { execFile } from 'child_process'

export default function run(script: string): Promise<string> {
  const pathToScript: string = path.normalize(config.scriptLocation + script)

  return new Promise((resolve, reject) => {
    execFile(pathToScript, null, (error, stdout, stderr) => {
      if (stderr) {
        console.error(stderr)
      }

      if (error) {
        reject(error)
      }
      resolve(stdout)
    })
  })
}
