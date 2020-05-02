import { useState, useEffect } from 'react'
import { default as gun, transactionsDb, Transaction } from '@veto/db'

export default (onlyStatusUpdate?: boolean) => {
  const instance = gun.get('transactions')
  const [transactions, setTransactions] = useState<{ [key: string]: Transaction }>({})

  useEffect(() => {
    transactionsDb.on(
      instance,
      (transaction: Transaction) => {
        setTransactions((transactions) => ({
          ...transactions,
          [transaction.id]: transaction,
        }))
      },
      onlyStatusUpdate ? 'status' : undefined,
    )

    return () => transactionsDb.off(instance)
  }, [instance, onlyStatusUpdate])

  const send = (transaction: Transaction) => transactionsDb.send(instance, transaction)
  const receive = (transaction: Transaction) => transactionsDb.receive(instance, transaction)

  return [transactions, send, receive]
}
