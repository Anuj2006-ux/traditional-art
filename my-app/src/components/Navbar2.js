import React from 'react';
import './Navbar2.css';
import { Link } from 'react-router-dom';
import lo from './logo.png';

export default function NavbarKoyebStyle() {
  return (
   <nav className="koyeb-navbar">
  <div className="logo">
    <img src={lo} alt="Logo" className="logo-image" />
    Tradavya
  </div>

  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/shopping">Shopping</Link>
    <Link to="/gallery">Gallery</Link>
    <Link to="/about">About Us</Link>
    <Link to="/special">Special</Link>
    <Link to="/login" className="login-link">Login</Link>
    <Link to="/signup" className="signup-btn">Sign Up</Link>
  </div>
</nav>

  );
}
