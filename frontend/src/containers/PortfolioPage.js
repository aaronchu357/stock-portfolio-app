import React from 'react'
import Portfolio from './Portfolio'

class PortfolioPage extends React.Component {

  state = {
    userData: '',
    balance: 0
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile', {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(userInfo => {
          this.setState({ userData: userInfo.data, balance: userInfo.data.attributes.balance })
        })
    }
  }

   handleBalanceChange = (remainingBalance) => {
    fetch(`http://localhost:3000/users/${this.props.userData.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ balance: remainingBalance })
    })
      .then(resp => resp.json())
      .then(userData => {
        this.setState({ userData: userData.data })
        window.location.reload()
      })
  }

  // useEffect(() => {
  //   if (props.userData !== "") {
  //     setUserData(props.userData)
  //   } else {
  //     props.history.push('/signin')
  //   }
  // }, [userData])
  render() {

    return (
      <div>
        <h2 className="page-header">Portfolio</h2>
        Hi, {this.state.userData ? this.state.userData.attributes.name : null}
        <br />
        Balance: {this.state.balance ? this.state.balance : null}
        <Portfolio {...this.props} handleBalanceChange={this.handleBalanceChange}/>
      </div>
    )
  }
}

export default PortfolioPage