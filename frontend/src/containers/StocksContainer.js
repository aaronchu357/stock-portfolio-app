import React from 'react'
import Stock from '../components/Stock'

const StocksContainer = props => {

  const renderStocks = props.stocks.map(stockData => {
    return <Stock stockData={stockData} />
  })

  return (
    <ul>{renderStocks}</ul>
  )
}

export default StocksContainer