import React, { useState, useEffect } from 'react'
import BuyStockForm from '../forms/BuyStockForm'

const Portfolio = props => {

  // const [userData, setUserData] = useState([])

  // useEffect(() => {
  //   debugger
  //   if (localStorage.token) {
  //     fetch('/profile', {
  //       headers: {
  //         Authorization: localStorage.token
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(userInfo => {
  //         debugger
  //         setUserData(userInfo.data.attributes)
  //       })
  //   } else {
  //     props.history.push('/signin')
  //   }
  // }, [userData])  

  // state = { userData: '' }

  // componentDidMount() {
  //   if (localStorage.token) {
  //     fetch('http://localhost:3000/profile', {
  //       headers: {
  //         Authorization: localStorage.token
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(userInfo => {
  //         this.setState({ userData: userInfo.data.attributes })
  //       })
  //   }
  // }
  // render(){

  const handleStockFormSubmit = (ticker, quantity) => {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=GJNL5RPAWAUNFOK6`)
      .then(resp => resp.json())
      .then(stockData => {
        let userBalance = props.userData.balance
        let price = parseFloat(stockData["Global Quote"]["05. price"])
        let transactionTotal = price * quantity
        if (userBalance < transactionTotal) {
          alert(`Balance insufficient. Transaction total is ${transactionTotal}.`)
        } else {
          handleStock(ticker, quantity, price, userBalance, transactionTotal)
        }
      })
      .catch(error => {
        alert(error)
      })
  }

  const handleStock = (ticker, quantity, price, balance, total) => {
    let stockInfo = { ticker: ticker, price: price}
    debugger
    fetch(`http://localhost:3000/stocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: localStorage.token
      },
      body: JSON.stringify(stockInfo)
    })
      .then(resp => resp.json())
      .then(console.log)
      // .then(stockData => {
      //   debugger
      //   // handleTransaction(stockData.data, quantity, balance, total)
      // })
      // .catch(error => alert(error))
  }

  // const handleTransaction = (stockData, quantity, balance, total) => {
  //   fetch('http://localhost:3000/transactions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       quantity: quantity,
  //       user_id: props.userData.id,
  //       stock_id: stockData.id
  //     })
  //       .then(resp => resp.json())
  //       .then(transactionData => {
  //         debugger
  //       })
  //       .catch(error => alert(error))
  //   })
  // }

  return (
    <div className="portfolio">
      <h2 className="page-header">Portfolio</h2>
      Hi, {props.userData.name}
      <br />

      Balance: {props.userData.balance}
      <BuyStockForm {...props} handleStockFormSubmit={handleStockFormSubmit} />
    </div>
  )
}

export default Portfolio