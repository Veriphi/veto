import getDockerVersion from '../getDockerVersion'
import * as childProcess from 'child_process'

jest.mock('child_process', () => ({
  execFile: jest.fn(),
}))

describe('getDockerVersion', () => {
  it('return a Promise<string> on success', async () => {
    const expectedOutput = 'v0.0.0'
    // @ts-ignore
    childProcess.execFile.mockImplementation((path, arg, callback) => {
      const error = null
      const stdout = expectedOutput
      const stderr = ''
      callback(error, stdout, stderr)
    })
    const dockerVersion = await getDockerVersion()
    expect(dockerVersion).toBe(expectedOutput)
  })

  it('should throw an error if the execFile provide and error', async () => {
    const expectedError = new Error('test error')
    // @ts-ignore
    childProcess.execFile.mockImplementation((path, arg, callback) => {
      const error = expectedError
      const stdout = ''
      const stderr = ''
      callback(error, stdout, stderr)
    })

    return expect(getDockerVersion()).rejects.toEqual(expectedError)
  })
})
