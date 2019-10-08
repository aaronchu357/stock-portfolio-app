import React, { useState } from 'react'

const SignInForm = props => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onFormSubmit = (e) => {
    e.preventDefault()
    debugger
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(resp => resp.json())
      .then(parsedResponse => {
        debugger
        if (parsedResponse.token) {
          localStorage.setItem('token', parsedResponse.token)
          this.setState({ user: parsedResponse.user })
          props.history.push('/portfolio')
        } else {
          alert("Please check your email and password.")
        }
      })
  }

  return(
    <form className="sign-in-form" onSubmit={onFormSubmit}>
      Sign In
      <br/>
      Email: <input type="email" name="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required/>
      <br/>
      Password: <input type="password" name="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required/>
      <br/>
      <input type="submit" name="submit" value="Submit"/>
    </form>
  )
}

export default SignInForm