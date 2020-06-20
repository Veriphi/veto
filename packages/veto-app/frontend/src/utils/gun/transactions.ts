import { IGunChainReference } from 'gun/types/chain'
import { nanoid } from 'nanoid'
import gunClient from './index'

export const TRANSACTION_STORE_NAME = 'transactions'

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
  address: string
  amount?: number
  networkFees?: number
  type: TransactionType
  status: TransactionStatus
  createdAt: string
  wallet: string
  history: [TransactionHistory]
  label?: string
  hash?: string
}

class StoreTransactions {
  private gun: IGunChainReference<Transaction>

  constructor() {
    this.gun = gunClient.get(TRANSACTION_STORE_NAME)
  }

  private createTransaction(params: Partial<Transaction>) {
    const id = nanoid()
    const now = new Date()

    const transaction = {
      id,
      status: TransactionStatus.CREATED,
      createdAt: now.toISOString(),
      history: [
        {
          status: TransactionStatus.CREATED,
          timestamp: now,
        },
      ],
      ...params,
    }

    this.gun.get(id as keyof Transaction).put(transaction as never)

    return transaction
  }

  send(transaction: Transaction) {
    return this.createTransaction({
      ...transaction,
      networkFees: transaction.networkFees || 1,
      type: TransactionType.SEND,
    })
  }

  receive(transaction: Transaction) {
    return this.createTransaction({
      ...transaction,
      type: TransactionType.RECEIVE,
    })
  }

  on(callback: (transaction: Transaction) => void) {
    this.gun.map().on((transaction) => callback(transaction))
  }

  off() {
    this.gun.map().off()
  }
}

export default StoreTransactions
