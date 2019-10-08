import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './containers/SignIn'
import Register from './containers/Register'

const App = () => {
  return (
    <Switch>
      {/* {localStorage.token ? <Redirect to='/'/> : <Route path='/register' render={(routerProps) => <Register {...routerProps} />} />} */}
      {/* {localStorage.token ? <Redirect to='/'/> : <Route path='/' render={(routerProps) => <SignIn {...routerProps} />} />} */}
      <Route exact path='/' render={(routerProps) => <SignIn {...routerProps} />} />
    </Switch>
  );
}

export default App;
