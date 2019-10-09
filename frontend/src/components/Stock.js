import React, { useState, useEffect } from 'react'

const Stock = props => {

  // state = {
  //   price: '',

  // }

  // componentDidMount() {
  //   fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Object.keys(this.props.stockData)[0]}&apikey=GJNL5RPAWAUNFOK6`)
  //     .then(resp => resp.json())
  //     .then(stockData => {
  //       this.setState({ price: parseFloat(stockData["Global Quote"]["05. price"]) })
  //     })
  //     .catch(error => alert(error))
  // }

  const [stockState, setStockState] = useState({
    price: '',
    dayOpenPrice: ''
  })

  useEffect(() => {
    // Limited to 5 calls per minute, unable to show more than 5 stocks at once
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Object.keys(props.stockData)[0]}&apikey=GJNL5RPAWAUNFOK6`)
      .then(resp => resp.json())
      .then(stockData => {
        setStockState({ 
          price: parseFloat(stockData["Global Quote"]["05. price"]),
          dayOpenPrice: parseFloat(stockData["Global Quote"]["02. open"])
        })
      })
      .catch(error => alert(error))
  }, [props.stockData])

  // render() {
  return (
    <li>
      <em className="stock-ticker" {style}>{Object.keys(props.stockData)[0]}</em> - {Object.values(props.stockData)[0]} Shares Value: ${Math.round(stockState.price * Object.values(props.stockData)[0] * 10000) / 10000}
    </li>
  )
  // }
}

export default Stock