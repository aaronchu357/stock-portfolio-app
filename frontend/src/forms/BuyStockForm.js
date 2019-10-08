import React, { useState } from 'react'

const BuyStockForm = props => {

  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState(0)

  return (
    <form>
      Balance: {props.balance}
      <br />
      <input type="text" name="ticker" placeholder="Ticker" />
      <br />
      <input type="" name="quantity" placeholder="Quantity" />
      <br />
      <input type="submit" name="submit" value="Purchase" />
    </form>
  )
}

export default BuyStockForm