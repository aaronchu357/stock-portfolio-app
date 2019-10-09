import React from 'react'
import Transaction from '../components/Transaction'

const TransactionsContainer = props => {
  
  const renderTransactions = props.transactions.map(transaction => {
    return <Transaction transactionData={transaction} />
  })

  return (
    <ul>{renderTransactions}</ul>
  )
}

export default TransactionsContainer