import React, { useState, useEffect } from 'react'
import TransactionsContainer from '../containers/TransactionsContainer'

const TransactionPage = props => {

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (props.userData) {
      // API request from nested endpoint user/:id/transactions
      fetch(`http://localhost:3000/users/${props.userData.id}/transactions`)
        .then(resp => resp.json())
        .then(userTransactions => {
          setTransactions(userTransactions.data)
        })
    }
  }, [props.userData])

  return (
    <div>
      Your Transactions:
      <br />
      {props.userData ? <TransactionsContainer transactions={transactions} /> : "Loading..."}
    </div>
  )
}

export default TransactionPage