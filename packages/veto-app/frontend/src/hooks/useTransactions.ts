import { useState, useRef, useEffect } from 'react'
import { StoreTransactions, Transaction } from '@veto/db'

export default () => {
  const store = useRef<StoreTransactions | null>(null)
  const [transactions, setTransactions] = useState<{ [key: string]: Transaction }>({})

  useEffect(() => {
    store.current = new StoreTransactions()

    store.current.on((transaction) => {
      setTransactions((transactions) => ({
        ...transactions,
        [transaction.id]: transaction,
      }))
    })

    return () => {
      store.current && store.current.off()
    }
  }, [])

  const send = (transaction: Transaction) => store.current && store.current.send(transaction)
  const receive = (transaction: Transaction) => store.current && store.current.receive(transaction)

  return [transactions, send, receive]
}
