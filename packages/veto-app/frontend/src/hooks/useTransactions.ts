import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
// import { gun } from '@veto/db'

export enum TransactionType {
  SEND = 'SEND',
  RECEIVE = 'RECEIVE',
}

export enum TransactionStatus {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export type TransactionHistory = {
  timestamp: Date
  status: TransactionStatus
  details?: string
}

export type Transaction = {
  id: string
  type: TransactionType
  status: TransactionStatus
  createdAt: Date
  wallet: string
  address: string
  history: [TransactionHistory]
  label?: string
  hash?: string
}

export type TransactionSend = Transaction & {
  amount: number
  networkFees?: number
}

export type TransactionReceive = Transaction & {
  amount?: number
}

export default (onlyStatusUpdate?: boolean) => {
  /*const db = gun.get('transactions')
  const [transactions, setTransactions] = useState<{ [key: string]: Transaction }>({})

  const createTransaction = ({ type, ...others }) => {
    const id = nanoid()
    const now = new Date()

    const transaction = {
      id,
      status: TransactionStatus.CREATED,
      createdAt: now,
      type,
      history: [
        {
          status: TransactionStatus.CREATED,
          timestamp: now,
        },
      ],
      ...others,
    }

    db.get(id).put(transaction as never)

    return transaction
  }

  const send = ({ wallet, address, amount, networkFees = 1, label }) =>
    createTransaction({
      wallet,
      address,
      amount,
      networkFees,
      label,
      type: TransactionType.SEND,
    })

  const receive = ({ wallet, address, label }) =>
    createTransaction({
      wallet,
      address,
      label,
      type: TransactionType.RECEIVE,
    })

  useEffect(() => {
    const listenAll = () => {
      db.map().on((transaction: any) => {
        setTransactions((transactions) => ({
          ...transactions,
          [transaction.id]: transaction,
        }))
      })
    }

    const listenOnStatus = () => {
      db.map().on((transaction: any, id) => {
        const { _, ...data } = transaction
        const changes = Object.keys(data).length

        if (changes === 1 && data.status) {
          gun.get(id).once((transaction) => {
            transaction &&
              setTransactions((transactions) => ({
                ...transactions,
                [transaction.id]: transaction,
              }))
          })
        }
      }, true)
    }

    if (onlyStatusUpdate) {
      listenOnStatus()
    } else {
      listenAll()
    }

    return () => {
      db.map().off()
    }
  }, [db, onlyStatusUpdate])

  return [transactions, send, receive]
  */
  return []
}
