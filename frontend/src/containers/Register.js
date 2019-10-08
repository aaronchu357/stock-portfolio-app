import React from 'react'
import RegisterForm from '../forms/RegisterForm'

const Register = props => {
  return (
    <div className="register">
      <RegisterForm {...props} />
    </div>
  )
}

export default Register