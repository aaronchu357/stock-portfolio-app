import React from 'react'
import './Homepage.css'

const Homepage = () => {
  return (
    <>
      <h1 className="landing-page-main-header">Stock Portfolio App</h1>
      <div className='homepage-link'>
        <a class="effect1" href="http://localhost:3001/login">
          Log In
          <span class="bg"></span>
        </a>
      </div>
      <div className='homepage-link'>
        <a class="effect1" href="http://localhost:3001/register">
          Register
          <span class="bg"></span>
        </a>
      </div>
    </>
  )
}

export default Homepage