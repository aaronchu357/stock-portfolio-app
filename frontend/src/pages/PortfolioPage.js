import React, { useState, useEffect } from 'react'
import Portfolio from '../containers/Portfolio'
import NavBar from '../components/NavBar'

const PortfolioPage = props => {

  const [portfolioPageState, setPortfolioPageState] = useState({
    userData: '',
    balance: ''
  })

  useEffect(() => {
    if (localStorage.token) {
      fetch('/profile', {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(userInfo => {
          setPortfolioPageState({
            userData: userInfo.data,
            balance: userInfo.data.attributes.balance
          })
        })
    }
  }, [props.userData])

  const handleBalanceChange = remainingBalance => {
    fetch(`/users/${props.userData.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ balance: remainingBalance })
    })
      .then(resp => resp.json())
      .then(userData => {
        setPortfolioPageState({ userData: userData.data })
        window.location.reload()
      })
  }

  return (
    <div>
      <NavBar />
      <h2 className="page-header">Portfolio</h2>
      Hi, {portfolioPageState.userData ? portfolioPageState.userData.attributes.name : null}
      <br />
      Balance: {portfolioPageState.balance ? portfolioPageState.balance : null}
      <Portfolio {...props} handleBalanceChange={handleBalanceChange} />
    </div>
  )
}

export default PortfolioPage