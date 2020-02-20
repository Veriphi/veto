import getApplicationState, { ApplicationState, State } from '../getApplicationState'
import run from '../utils/run'

jest.mock('../utils/run', () => jest.fn())

describe('getApplicationState', () => {
  it('return a Promise<string> on success', async () => {
    const expectedOutput: ApplicationState = {
      veto: State.RUNNING,
      cyphernode: State.RUNNING,
    }
    // @ts-ignore
    run.mockImplementation(async () => 'running,running')

    const applicationState = await getApplicationState()
    expect(applicationState).toEqual(expectedOutput)
  })

  it('should throw an error if the execFile provide and error', async () => {
    const expectedError = new Error('test error')
    // @ts-ignore
    run.mockImplementation(async () => {
      throw expectedError
    })

    return expect(getApplicationState()).rejects.toEqual(expectedError)
  })
})
