import React, { useState } from 'react'

const RegisterForm = props => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()
    let userData = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    props.handleSubmit(userData, props.history, 'signup', 'Invalid')
  }

  return (
    <form className="register-form" onSubmit={onFormSubmit}>
      Sign In
      <br />
      Email: <input type="email" name="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      Password: <input type="password" name="password1" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      Password Confirmation: <input type="password" name="password2" placeholder="Enter Password Again" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
      <br />
      <input type="submit" name="submit" value="Submit" />
    </form>
  )
}

export default RegisterForm