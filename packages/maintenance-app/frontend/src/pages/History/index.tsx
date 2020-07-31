import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Transaction } from '../../utils/gun/transactions'
import useTransactions from '../../hooks/useTransactions'

const History: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  const [transactions] = useTransactions()

  return (
    <>
      <div>History</div>
      {Object.values(transactions).map((transaction: Transaction) => (
        <pre key={transaction.address}>{JSON.stringify(transaction, null, 2)}</pre>
      ))}
    </>
  )
}

export default History
