import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import { mockPassword } from './tempdata.json'
import { navigate } from '@reach/router'
import axios from 'axios'
import { Box, Flex } from '@veriphi/veto-ui'

export default () => {
  const password = useInput('')
  const handleOnLogin = () => {
    if (password.value === mockPassword) {
      navigate('/dashboard')
    }
  }

  const [data] = useState(null)
  async function getData() {
    const data = await axios(`http://${window?.location.host ?? 'localhost'}/api/getmempoolinfo`)

    console.log('\n%cresponse', 'color:orange;font-weight:bold;', data, '\n\n')
    // setData(await response.json())
  }

  return (
    <Flex sx={{ width: '100vw', height: '100vh' }} flexDirection="column" alignItems="center" justifyContent="center">
      <h1>Welcome Page</h1>
      <h3>Please log in with your veto password</h3>
      <form id="login" onSubmit={handleOnLogin}>
        <input name="password" type="password" {...password.bind} />
        <button type="submit">Login</button>
      </form>

      <button onClick={getData}>Hit the API</button>
      {data && <div>{data}</div>}
    </Flex>
  )
}
