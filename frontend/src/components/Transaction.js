import React from 'react'

const Transaction = props => {
  const transactionData = props.transactionData.attributes
  return (
    <>
      {transactionData.method} ({transactionData.stock.ticker}) - {transactionData.quantity} {transactionData.quantity === 1 ? "Share" : "Shares"} @ ${transactionData.price}
    </>
  )
}

export default Transaction