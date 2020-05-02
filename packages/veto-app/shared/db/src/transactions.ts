import { IGunChainReference } from 'gun/types/chain'

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
  address: string
  amount?: number
  networkFees?: number
  type: TransactionType
  status: TransactionStatus
  createdAt: Date
  wallet: string
  history: [TransactionHistory]
  label?: string
  hash?: string
}

const createTransaction = (gun: IGunChainReference<any>, params: Transaction) => {
  const now = new Date()
  const { address, type, ...others } = params

  const transaction = {
    address,
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

  gun.get(address).put(transaction as never)

  return transaction
}

const send = (gun: IGunChainReference<any>, transaction: Transaction) =>
  createTransaction(gun, {
    ...transaction,
    networkFees: transaction.networkFees || 1,
    type: TransactionType.SEND,
  })

const receive = (gun: IGunChainReference<any>, transaction: Transaction) =>
  createTransaction(gun, {
    ...transaction,
    type: TransactionType.RECEIVE,
  })

const on = (
  gun: IGunChainReference<any>,
  callback: (transaction: Transaction) => void,
  keyChange?: keyof Transaction,
) => {
  if (!keyChange) {
    return gun.map().on((transaction) => callback(transaction as Transaction))
  }

  return gun.map().on((transaction: any, id) => {
    const { _, ...data } = transaction
    const dataChanges = Object.keys(data)

    if (dataChanges.length === 1 && data[keyChange]) {
      gun.get(id).once((transaction) => {
        transaction && callback(transaction as Transaction)
      })
    }
  }, true)
}

const off = (gun: IGunChainReference<any>) => gun.map().off()

export default {
  send,
  receive,
  on,
  off,
}
