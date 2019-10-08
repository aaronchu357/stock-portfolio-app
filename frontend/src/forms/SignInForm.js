import React, { useState } from 'react'

const SignInForm = props => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()
    let userData = { email: email, password: password }
    props.handleSubmit(userData, props.history, 'login', 'Please check your email and password.')
  }

  return (
    <form className="sign-in-form" onSubmit={onFormSubmit}>
      Sign In
      <br />
      Email: <input type="email" name="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      Password: <input type="password" name="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      <input type="submit" name="submit" value="Submit" />
    </form>
  )
}

export default SignInForm