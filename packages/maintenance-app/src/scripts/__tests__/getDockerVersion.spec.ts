import getDockerVersion from '../getDockerVersion'
import run from '../utils/run'

jest.mock('../utils/run', () => jest.fn())

describe('getDockerVersion', () => {
  it('return a Promise<string> on success', async () => {
    const expectedOutput = 'v0.0.0'
    // @ts-ignore
    run.mockImplementation(async () => expectedOutput)
    const dockerVersion = await getDockerVersion()
    expect(dockerVersion).toBe(expectedOutput)
  })

  it('should throw an error if the execFile provide and error', async () => {
    const expectedError = new Error('test error')
    // @ts-ignore
    run.mockImplementation(async () => {
      throw expectedError
    })

    return expect(getDockerVersion()).rejects.toEqual(expectedError)
  })
})
