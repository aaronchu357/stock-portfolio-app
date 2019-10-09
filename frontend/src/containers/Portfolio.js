import React, { useState, useEffect } from 'react'
import BuyStockForm from '../forms/BuyStockForm'
import PortfolioStock from './PortfolioStock'

const Portfolio = props => {

  // const [userData, setUserData] = useState('')
  // const [userBalance, setUserBalance] = useState('')

  // useEffect(() => {
  //   if (props.userData !== "") {
  //     setUserData(props.userData)
  //     setUserBalance(props.userData.attributes.balance)
  //   } else {
  //     props.history.push('/signin')
  //   }
  // }, [userData])

  const handleStockFormSubmit = (ticker, quantity) => {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=GJNL5RPAWAUNFOK6`)
      .then(resp => resp.json())
      .then(stockData => {
        let userBalance = props.userData.attributes.balance
        let price = parseFloat(stockData["Global Quote"]["05. price"])
        let transactionTotal = price * quantity
        if (userBalance < transactionTotal) {
          alert(`Balance insufficient. Transaction total is ${transactionTotal}.`)
        } else {
          handleStock(ticker, quantity, price, transactionTotal)
        }
      })
      .catch(error => console.log(error))
  }

  const handleStock = (ticker, quantity, price, total) => {
    let stockInfo = { ticker: ticker, price: price }
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
        handleTransaction(stockData.data, quantity, total)
      })
      .catch(error => console.log(error))
  }

  const handleTransaction = (stockData, quantity, total) => {
    let transactionInfo = {
      quantity: parseInt(quantity),
      user_id: props.userData.id,
      stock_id: parseInt(stockData.id)
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
        console.log(total)
        let balance = props.userData.attributes.balance
        let remainingBalance = balance - total
        props.handleBalanceChange(remainingBalance)
        // setUserData(
        //   {
        //     ...userData,
        //     attributes: {
        //       ...userData.attributes,
        //       balance: remainingBalance
        //     }
        //   }
        // )
      })
      .catch(error => console.log(error))
  }

  // const handleBalanceChange = (remainingBalance) => {
  //   fetch(`http://localhost:3000/users/${this.props.userData.id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ balance: remainingBalance })
  //   })
  //     .then(resp => resp.json())
  //     .then(userData => {
  //       setUserData(userData.data)
  //     })
  // }
  // debugger
  return (
    <div className="portfolio">
      {/* {console.log("1")}
      <h2 className="page-header">Portfolio</h2>
      Hi, {userData ? userData.attributes.name : null}
      <br /> */}
      <PortfolioStock userData={props.userData} />
      {/* Balance: {userBalance ? userBalance : null} */}
      <BuyStockForm {...props} handleStockFormSubmit={handleStockFormSubmit} />
    </div>
  )
}

export default Portfolio