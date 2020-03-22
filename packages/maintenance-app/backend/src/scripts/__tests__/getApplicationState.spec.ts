import getApplicationState, { ApplicationState, State } from '../getApplicationState'
import run from '../utils/run'

jest.mock('../utils/run', () => jest.fn())

describe('getApplicationState', () => {
  it('should return State.RUNNING if all instance are running', async () => {
    const expectedOutput: ApplicationState = {
      veto: State.RUNNING,
      cyphernode: State.RUNNING,
    }
    // @ts-ignore
    run.mockImplementation(async () =>
      JSON.stringify({
        veto: { Status: State.RUNNING },
        cyphernode_1: { Status: State.RUNNING },
        cyphernode_2: { Status: State.RUNNING },
        cyphernode_3: { Status: State.RUNNING },
        cyphernode_4: { Status: State.RUNNING },
        cyphernode_5: { Status: State.RUNNING },
        cyphernode_6: { Status: State.RUNNING },
        cyphernode_7: { Status: State.RUNNING },
        cyphernode_8: { Status: State.RUNNING },
      }),
    )

    const applicationState = await getApplicationState()
    expect(applicationState).toEqual(expectedOutput)
  })

  it('should return State.INSTALLED if all cyphernode instances are at least present on the system', async () => {
    const expectedOutput: ApplicationState = {
      veto: State.RUNNING,
      cyphernode: State.INSTALLED,
    }
    // @ts-ignore
    run.mockImplementation(async () =>
      JSON.stringify({
        veto: { Status: State.RUNNING },
        cyphernode_1: { Status: State.RUNNING },
        cyphernode_2: { Status: State.RUNNING },
        cyphernode_3: { Status: State.INSTALLED },
        cyphernode_4: { Status: State.RUNNING },
        cyphernode_5: { Status: State.PAUSED },
        cyphernode_6: { Status: State.RUNNING },
        cyphernode_7: { Status: State.RESTARTING },
        cyphernode_8: { Status: State.RUNNING },
      }),
    )

    const applicationState = await getApplicationState()
    expect(applicationState).toEqual(expectedOutput)
  })

  it('should return State.MISSING if there is less cyphernode instance than the minimum required (8)', async () => {
    const expectedOutput: ApplicationState = {
      veto: State.RUNNING,
      cyphernode: State.MISSING,
    }
    // @ts-ignore
    run.mockImplementation(async () =>
      JSON.stringify({
        veto: { Status: State.RUNNING },
        cyphernode_1: { Status: State.RUNNING },
        cyphernode_2: { Status: State.RUNNING },
        cyphernode_3: { Status: State.RUNNING },
        cyphernode_4: { Status: State.RUNNING },
        cyphernode_5: { Status: State.RUNNING },
        cyphernode_6: { Status: State.RUNNING },
        cyphernode_7: { Status: State.RUNNING },
      }),
    )

    const applicationState = await getApplicationState()
    expect(applicationState).toEqual(expectedOutput)
  })

  it('should return State.EXITED if one instance has exited', async () => {
    const expectedOutput: ApplicationState = {
      veto: State.RUNNING,
      cyphernode: State.EXITED,
    }
    // @ts-ignore
    run.mockImplementation(async () =>
      JSON.stringify({
        veto: { Status: State.RUNNING },
        cyphernode_1: { Status: State.RUNNING },
        cyphernode_2: { Status: State.RUNNING },
        cyphernode_3: { Status: State.RUNNING },
        cyphernode_4: { Status: State.RUNNING },
        cyphernode_5: { Status: State.RUNNING },
        cyphernode_6: { Status: State.RUNNING },
        cyphernode_7: { Status: State.RUNNING },
        cyphernode_8: { Status: State.EXITED },
      }),
    )

    const applicationState = await getApplicationState()
    expect(applicationState).toEqual(expectedOutput)
  })

  it('should return unknown state of the data from the system incomplete', async () => {
    const expectedOutput: ApplicationState = {
      veto: State.UNKNOWN,
      cyphernode: State.UNKNOWN,
    }
    // @ts-ignore
    run.mockImplementation(async () => `{}`)

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
