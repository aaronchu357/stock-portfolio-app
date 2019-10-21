import React, { useState, useEffect } from 'react'
import TransactionsContainer from '../containers/TransactionsContainer'
import NavBar from '../components/NavBar'

const TransactionPage = props => {

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (props.userData) {
      // API request from nested endpoint user/:id/transactions
      fetch(`/users/${props.userData.id}/transactions`)
        .then(resp => resp.json())
        .then(userTransactions => {
          setTransactions(userTransactions.data)
        })
    }
  }, [props.userData])

  return (
    <div>
      <NavBar />
      Your Transactions:
      <br />
      {props.userData ? <TransactionsContainer transactions={transactions} /> : "Loading..."}
    </div>
  )
}

export default TransactionPage