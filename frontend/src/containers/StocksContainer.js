import React from 'react'
import Stock from '../components/Stock'

const StocksContainer = props => {
  const renderStocks = props.stocks.map(stockData => {
    return (
      <li key={Object.keys(props.stocks[0])[0]}>
        <Stock stockData={stockData} />
      </li>
    )
  })

  return (
    <ul>{renderStocks}</ul>
  )
}

export default StocksContainer