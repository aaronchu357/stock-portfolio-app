import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/portfolio">Portfolio</NavLink> | <NavLink to="/transactions">Transactions</NavLink>
    </nav>
  )
}

export default NavBar