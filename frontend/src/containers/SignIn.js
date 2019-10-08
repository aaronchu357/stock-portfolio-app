import React from 'react'
import SignInForm from '../forms/SignInForm'

const SignIn = props => {
  return (
    <div className="sign-in">
      <SignInForm {...props} />
    </div>
  )
}

export default SignIn