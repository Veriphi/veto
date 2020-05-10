import { useState, useRef, useEffect } from 'react'
import { StoreTransactions, Transaction } from '@veto/db'

type TransactionsHook = () => [
  { [key: string]: Transaction },
  (transaction: Transaction) => void,
  (transaction: Transaction) => void,
]

const useTransactions: TransactionsHook = () => {
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
      store.current?.off()
    }
  }, [])

  const send = (transaction: Transaction) => {
    store.current?.send(transaction)
  }

  const receive = (transaction: Transaction) => {
    store.current?.receive(transaction)
  }

  return [transactions, send, receive]
}

export default useTransactions
