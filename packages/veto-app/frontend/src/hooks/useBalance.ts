import { useState, useEffect } from 'react'
import { getBalance } from '../api'

const useBalance = (): [any, boolean, string] => {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const balance = await getBalance()
        setData(balance)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return [data, loading, error]
}

export default useBalance
