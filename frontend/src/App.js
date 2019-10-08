import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './containers/SignIn'
import Register from './containers/Register'

const App = () => {

  const [userData, setUserData] = useState([])
  
  const handleSubmit = (userData, history, endpoint, alertMessage) => {
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
          setUserData({ user: parsedResponse.user })
          history.push('/portfolio')
        } else {
          alert(alertMessage)
        }
      })
  }

  return (
    <Switch>
      {
        localStorage.token ?
          <Redirect to='/portfolio' />
          :
          <Route path='/' render={(routerProps) => <SignIn {...routerProps} handleSubmit={handleSubmit} />} />
      }
      {
        localStorage.token ?
          <Redirect to='/portfolio' />
          :
          <Route path='/register' render={(routerProps) => <Register {...routerProps} handleSubmit={handleSubmit} />} />
      }
    </Switch>
  );
}

export default App;
