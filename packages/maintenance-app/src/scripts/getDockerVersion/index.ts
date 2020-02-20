import { execFile } from 'child_process'
import * as path from 'path'

export default function getDockerVersion(): Promise<string> {
  const pathToScript: string = path.normalize(__dirname + '/get-docker-version.sh')

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
