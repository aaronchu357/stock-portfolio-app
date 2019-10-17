import React, { useState, useEffect } from 'react'
import BuyStockForm from '../forms/BuyStockForm'
import StocksContainer from './StocksContainer'

const Portfolio = props => {

  const [stocks, setStocks] = useState([])

  useEffect(() => {
    if (props.userData) {
      // API request from nested endpoint user/:id/transactions
      fetch(`http://localhost:3000/users/${props.userData.id}/transactions`)
        .then(resp => resp.json())
        .then(userTransactions => {
          let finalAssortedTransactionsArray = []
          // count number of shares for each stock
          let sortedTransactions = {}
          userTransactions.data.forEach(transaction => {
            if (sortedTransactions[transaction.attributes.stock.ticker]) {
              sortedTransactions[transaction.attributes.stock.ticker] += transaction.attributes.quantity
            } else {
              sortedTransactions[transaction.attributes.stock.ticker] = transaction.attributes.quantity
            }
          })
          // convert the sorted hash to individual objects in array
          Object.keys(sortedTransactions).forEach(key => {
            let stockToPush = {}
            stockToPush[key] = sortedTransactions[key]
            finalAssortedTransactionsArray = [...finalAssortedTransactionsArray, stockToPush]
          })
          setStocks(finalAssortedTransactionsArray)
        })
    }
  }, [props.userData])

  const handleStockFormSubmit = (ticker, quantity, method) => {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=GJNL5RPAWAUNFOK6`)
      .then(resp => resp.json())
      .then(stockData => {
        let userBalance = props.userData.attributes.balance
        let price = parseFloat(stockData["Global Quote"]["05. price"])
        let transactionTotal = price * quantity
        if (userBalance < transactionTotal) {
          alert(`Balance insufficient. Transaction total is ${transactionTotal}.`)
        } else {
          handleStock(ticker, quantity, price, transactionTotal, method)
        }
      })
      .catch(error => {
        console.log(error)
        alert('Oops, something went wrong! Check that you have entered a valid symbol. If it still does not work, please wait 60 seconds due to the API call constraints.')
      })
  }

  const handleStock = (ticker, quantity, price, total, method) => {
    let stockInfo = { ticker: ticker }
    fetch('http://localhost:3000/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: localStorage.token
      },
      body: JSON.stringify(stockInfo)
    })
      .then(resp => resp.json())
      .then(stockData => {
        handleTransaction(stockData.data, price, quantity, total, method)
      })
      .catch(error => console.log(error))
  }

  const handleTransaction = (stockData, price, quantity, total, method) => {
    let transactionInfo = {
      quantity: parseInt(quantity),
      user_id: props.userData.id,
      stock_id: parseInt(stockData.id),
      price: price,
      method: method
    }
    fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: localStorage.token
      },
      body: JSON.stringify(transactionInfo)
    })
      .then(resp => resp.json())
      .then(transactionData => {
        let balance = props.userData.attributes.balance
        let remainingBalance = balance - total
        props.handleBalanceChange(remainingBalance)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="portfolio">
      {props.userData ? <StocksContainer userData={props.userData} stocks={stocks} /> : 'Loading...'}
      <BuyStockForm {...props} handleStockFormSubmit={handleStockFormSubmit} />
    </div>
  )
}

export default Portfolio