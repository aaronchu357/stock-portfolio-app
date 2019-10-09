import React, { useState } from 'react'

const BuyStockForm = props => {

  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState(0)

  const handleStockFormSubmit = (e) => {
    e.preventDefault()
    props.handleStockFormSubmit(ticker, quantity)
  }

  return (
    <form onSubmit={handleStockFormSubmit}>
      Purchase Form:
      <br />
      <input type="text" name="ticker" placeholder="Symbol" value={ticker} onChange={e => setTicker(e.target.value)} />
      <br />
      <input type="number" name="quantity" placeholder="Quantity" value={quantity} min="1" max="10000" onChange={e => setQuantity(e.target.value)} />
      <br />
      <input type="submit" name="submit" value="Purchase" />
    </form>
  )
}

export default BuyStockForm