import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import { navigate } from '@reach/router'
import { Flex, Text, Input, Button } from '@veriphi/veto-ui'
import { mockPassword } from './tempdata.json'
import axios from 'axios'

export default () => {
  const password = useInput('')

  const handleOnLogin = () => {
    if (password.value === mockPassword) {
      navigate('/dashboard')
    }
  }

  const [data] = useState(null)
  // Todo: Move result to state|props to display the install & factory reset button
  async function getApplicationState() {
    const data = await axios('/api/get-info')

    console.log('\n%cresponse', 'color:orange;font-weight:bold;', data, '\n\n')
  }

  return (
    <Flex sx={{ width: '100vw', height: '100vh' }} flexDirection="column" alignItems="center" justifyContent="center">
      <Text m={3} variant="heading1">
        Maintenance App
      </Text>
      <Flex
        as="form"
        id="login"
        onSubmit={handleOnLogin}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Input
          my={3}
          name="password"
          type="password"
          placeholder="your node password..."
          sx={{ minWidth: '20rem' }}
          {...password.bind}
        />
        <Button my={3} type="submit" variant="primary">
          Login
        </Button>
      </Flex>
      <button onClick={getApplicationState}>Hit the API</button>
      {data && <div>{data}</div>}
    </Flex>
  )
}
