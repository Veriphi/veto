import React, { SyntheticEvent, FunctionComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useInput } from '../../hooks/useInput'
import { navigate } from '@reach/router'
import { Flex, Text, Input, Button } from '@veriphi/veto-ui'
import { mockPassword } from './tempdata.json'

const Welcome: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  const password = useInput('')

  const handleOnLogin = (event: SyntheticEvent) => {
    event.preventDefault()
    if (password.value === mockPassword) {
      navigate('/dashboard')
    }
  }

  return (
    <Flex sx={{ width: '100vw', height: '100vh' }} flexDirection="column" alignItems="center" justifyContent="center">
      <Text m={3} variant="heading1">
        Welcome Page
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
    </Flex>
  )
}

export default Welcome
