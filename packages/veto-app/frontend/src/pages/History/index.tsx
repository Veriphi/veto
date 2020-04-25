import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import useTransactions, { Transaction } from '../../hooks/useTransactions'

const History: FunctionComponent<RouteComponentProps> = (): JSX.Element => {
  const [transactions] = useTransactions()

  return (
    <>
      <div>History</div>
      {Object.values(transactions).map((transaction: Transaction) => (
        <pre key={transaction.id}>{JSON.stringify(transaction, null, 2)}</pre>
      ))}
    </>
  )
}

export default History
