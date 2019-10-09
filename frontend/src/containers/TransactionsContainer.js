import React from 'react'
import Transaction from '../components/Transaction'

const TransactionsContainer = props => {

  const renderTransactions = props.transactions.map(transaction => {
    return (
      <li key={transaction.id}>
        <Transaction transactionData={transaction} />
      </li>
    )
  })

  return (
    <ul>{renderTransactions}</ul>
  )
}

export default TransactionsContainer