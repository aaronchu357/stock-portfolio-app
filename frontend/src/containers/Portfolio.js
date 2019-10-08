import React, { useState, useEffect } from 'react'
import BuyStockForm from '../forms/BuyStockForm'

const Portfolio = props => {

  // const [userData, setUserData] = useState([])

  // useEffect(() => {
  //   if (localStorage.token) {
  //     debugger
  //     fetch('/profile', {
  //       headers: {
  //         Authorization: localStorage.token
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(userInfo => {
  //         debugger
  //         setUserData(props.userInfo.data.attributes)
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
      .catch(error => console.log(error))
  }

  const handleStock = (ticker, quantity, price, balance, total) => {
    let stockInfo = { ticker: ticker, price: price }
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
      .then(stockData => {
        handleTransaction(stockData.data, quantity, balance, total)
      })
      .catch(error => console.log(error))
  }

  const handleTransaction = (stockData, quantity, balance, total) => {
    debugger
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
        debugger
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="portfolio">
      <h2 className="page-header">Portfolio</h2>
      Hi, {props.userData === "" ? null : props.userData.attributes.name}
      <br />

      Balance: {props.userData === "" ? null : props.userData.attributes.balance}
      <BuyStockForm {...props} handleStockFormSubmit={handleStockFormSubmit} />
    </div>
  )
}

export default Portfolio