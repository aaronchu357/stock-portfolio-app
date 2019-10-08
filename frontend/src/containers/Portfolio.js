import React, { useState, useEffect } from 'react'
import BuyStockForm from '../forms/BuyStockForm'

const Portfolio = props => {

  // const [userData, setUserData] = useState([])

  // useEffect(() => {
  //   debugger
  //   if (localStorage.token) {
  //     fetch('/profile', {
  //       headers: {
  //         Authorization: localStorage.token
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(userInfo => {
  //         debugger
  //         setUserData(userInfo.data.attributes)
  //       })
  //   } else {
  //     props.history.push('/signin')
  //   }
  // }, [userData])  

  // state = { userData: '' }

  // componentDidMount() {
  //   if (localStorage.token) {
  //     fetch('http://localhost:3000/profile', {
  //       headers: {
  //         Authorization: localStorage.token
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(userInfo => {
  //         this.setState({ userData: userInfo.data.attributes })
  //       })
  //   }
  // }
  // render(){

    return (
      <div className="portfolio">
      <h2 className="page-header">Portfolio</h2>
      Hi, {props.userData.name}
      <BuyStockForm balance={props.userData.balance} />
    </div>
  )
} 

export default Portfolio