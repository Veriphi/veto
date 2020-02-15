import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import { mockPassword } from './tempdata.json'
import { navigate } from '@reach/router'
import axios from 'axios'

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
    <div>
      <h1>Welcome Page</h1>
      <h3>Please log in with your veto password</h3>
      <form id="login" onSubmit={handleOnLogin}>
        <input name="password" type="password" {...password.bind} />
        <button type="submit">Login</button>
      </form>

      <button onClick={getData}>Hit the API</button>
      {data && <div>{data}</div>}
    </div>
  )
}
