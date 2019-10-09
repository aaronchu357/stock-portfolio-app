import React from 'react'

const Transaction = props => {
  return (
    <>
      {props.transactionData.attributes.method} ({props.transactionData.attributes.stock.ticker}) - {props.transactionData.attributes.quantity} Shares @ ${props.transactionData.attributes.price}
    </>
  )
}

export default Transaction