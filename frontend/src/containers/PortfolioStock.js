import React from 'react'
import Stock from '../components/Stock'

class PortfolioStock extends React.Component {

  render(){
    const renderStocks = () => {
      debugger
      this.props.stocks.map(stockData => {
        return <Stock stockData={stockData}/>
      })
    }
    
    return( 
      <div>
      {renderStocks}
    </div>
  )
}
}

export default PortfolioStock