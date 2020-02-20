import run from '../run'
import * as childProcess from 'child_process'

jest.mock('child_process', () => ({
  execFile: jest.fn(),
}))

describe('run', () => {
  it('return a Promise<string> on success', async () => {
    const expectedOutput = 'some script output'
    // @ts-ignore
    childProcess.execFile.mockImplementation((path, arg, callback) => {
      const error = null
      const stdout = expectedOutput
      const stderr = ''
      callback(error, stdout, stderr)
    })
    const dockerVersion = await run('not-a-real-script.sh')
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

    return expect(run('not-a-real-script.sh')).rejects.toEqual(expectedError)
  })
})
