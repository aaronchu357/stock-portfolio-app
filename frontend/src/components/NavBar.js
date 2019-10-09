import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/portfolio">Portfolio</NavLink> | <NavLink to="/transactions">Transactions</NavLink>
    </nav>
  )
}

export default NavBar