import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex flex-row gap-4">
        <NavLink to="/" className="hover:text-indigo-400 transition duration-300">Home</NavLink>
        <NavLink to="/pastes" className="hover:text-indigo-400 transition duration-300">All Pastes</NavLink>
      </div>
    </nav>
  );
}

export default Navbar