import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from './logo.png';
import Navbar2 from './Navbar2';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/Home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  const create = () => {
    navigate('/Register2');
  };

  const shop = () => {
    alert("Log in to shop");
  };

  return (
    <>
    {/* <Navbar2 /> */}
    
  <div className="fullscreen-bg">
      <div className="overlay"></div>
      

      <form onSubmit={handleSubmit} className="floating-login-form">
        <img src={logo} alt="Logo" className="login-logo" />

        <div className="input-wrapper">
          <i className="fas fa-user"></i>
          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        style={{color:"white"}}  />
        </div>

        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
         style={{color:"white"}} />
        </div>

        <div className="centered-login">
          <button type="submit" className="login-btn-wide">LOG IN</button>
        </div>

        <div className="form-links">
          <Link to="/Forgetpassword">Forgot password?</Link>
        </div>

        <div className='centered-login'>
          <button type='button' className='login-btn-wide create' onClick={create}>Create new account</button>
        </div>
      </form>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms Of Use</a>
        </div>
        <div className="footer-copy">
          © 2025 Indian Art. All Rights Reserved | Design By <span className="designer">W3layouts</span>
        </div>
      </footer>
    </div>
    </>
  );
}
