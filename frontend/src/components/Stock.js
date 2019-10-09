import React, { useState, useEffect } from 'react'

const Stock = props => {

  const [stockState, setStockState] = useState({
    price: '',
    dayOpenPrice: '',
    color: ''
  })
  
  const shares = Object.values(props.stockData)[0]
  const ticker = Object.keys(props.stockData)[0]
  const value = Math.round(stockState.price * shares * 10000) / 10000

  useEffect(() => {
    // Limited to 5 calls per minute, unable to show more than 5 stocks at once
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Object.keys(props.stockData)[0]}&apikey=GJNL5RPAWAUNFOK6`)
      .then(resp => resp.json())
      .then(stockData => {
        let currentPrice = parseFloat(stockData["Global Quote"]["05. price"])
        let openPrice = parseFloat(stockData["Global Quote"]["02. open"])
        let tickerColor = ''
        if (currentPrice > openPrice) {
          tickerColor = 'green'
        } else if (currentPrice < openPrice) {
          tickerColor = 'red'
        } else {
          tickerColor = 'grey'
        }
        setStockState({
          price: currentPrice,
          dayOpenPrice: openPrice,
          color: tickerColor
        })
      })
      .catch(error => {
        console.log(error)
        alert('Sorry about some of your portfolio data. You have reached the limit for API calls. Please wait 60 seconds and try again.')
      })
  }, [props.stockData])

  return (
    <li>
      <em className="stock-ticker" style={{ color: `${stockState.color}` }}>{ticker}</em> - {shares} {shares === 1 ? "Share" : "Shares" } Value: ${value}
    </li>
  )
}

export default Stock