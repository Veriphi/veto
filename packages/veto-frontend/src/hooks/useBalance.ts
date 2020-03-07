import { useState, useEffect } from 'react'
import { getBalance } from 'api'

const useBalance = (): [any, boolean, Error | null] => {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const balance = await getBalance()
        setData(balance)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return [data, loading, error]
}

export default useBalance
