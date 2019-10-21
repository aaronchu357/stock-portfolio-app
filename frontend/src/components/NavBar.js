import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/portfolio">Portfolio</NavLink> | <NavLink to="/transactions">Transactions</NavLink> | <a href="/" onClick={() => localStorage.clear()}>Log Out</a>
    </nav>
  )
}

export default NavBar