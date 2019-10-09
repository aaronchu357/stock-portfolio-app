import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './containers/SignIn'
import Register from './containers/Register'
import PortfolioPage from './containers/PortfolioPage'

class App extends React.Component {

  state = { userData: '' }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile', {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(userInfo => {
          this.setState({ userData: userInfo.data })
        })
    }
  }

  handleSubmit = (userData, history, endpoint, alertMessage) => {
    fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(resp => resp.json())
      .then(parsedResponse => {
        if (parsedResponse.token) {
          localStorage.setItem('token', parsedResponse.token)
          this.setState({ userData: parsedResponse.user })
          history.push('/portfolio')
        } else {
          alert(alertMessage)
        }
      })
  }

  render() {
    return (
      <Switch>
        <Route exact path='/portfolio' render={(routerProps) => <PortfolioPage {...routerProps} userData={this.state.userData} />} />
        {
          localStorage.token ?
            <Redirect to='/portfolio' />
            :
            <Route path='/signin' render={(routerProps) => <SignIn {...routerProps} handleSubmit={this.handleSubmit} />} />
        }
        {
          localStorage.token ?
            <Redirect to='/portfolio' />
            :
            <Route path='/register' render={(routerProps) => <Register {...routerProps} handleSubmit={this.handleSubmit} />} />
        }
      </Switch>
    );
  }
}


export default App;
