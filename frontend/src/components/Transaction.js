import React from 'react'

const Transaction = props => {
  return(
    <li>
      {props.transactionData.attributes.stock.ticker} - {props.transactionData.attributes.quantity} Shares @ ${props.transactionData.attributes.price}
    </li>
  )
}

export default Transaction