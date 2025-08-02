import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logoImg from './logo.png'; // Make sure logo.png is in the same folder or correct path

export default function NavbarKoyebStyle() {
  return (
    <nav className="koyeb-navbar">
      <div className="nav-left">
        <div className="logo-text">
          <span>TR</span>
          <img src={logoImg} alt="Logo" className="logo-img" />
          <span>ADAVYA</span>
        </div>
      </div>

      <div className="nav-right">
        <Link to="/Home">Home</Link>
        <Link to="/shopping">Shopping</Link>
        {/* <Link to="/gallery">Gallery</Link> */}
        <Link to="/about">About Us</Link>
        <Link to="/Special">Extra Features</Link>
        <Link to="/" className="login-link">Login</Link>
        <Link to="/Register2" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
}