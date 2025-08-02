import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { jwtDecode } from 'jwt-decode';
import logo from './logo.png';
import Navbar from './Navbar2';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    alert(`Welcome ${userObject.name}`);
    console.log("Google user:", userObject);
    navigate('/Home');
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '367913843312-pv7abojnlvlrce2rhcnu3656fgacghfe.apps.googleusercontent.com',
        callback: handleGoogleResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-btn"),
        { theme: "outline", size: "medium" }
      );
    }
  }, []);

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill in the email and password fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
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
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fullscreen-bg darktoggle background">
      {/* <Navbar /> */}

      <form className="floating-login-form">
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
        style={{color:"white"}}  />
        </div>

        <div className="button-row">
          <button type="button" className="register-btn" onClick={handleRegister} style={{ backgroundColor: '#4CAF50', color: 'white',borderRadius:"40px",width:"260px",height:"40px",border:"none",fontSize:"16px",cursor:"pointer"
          }}>REGISTER</button>
          {/* <button type="button" className="login-btn" onClick={() => navigate('/Login')}>GO TO LOGIN</button> */}
        </div>

        <div className="register-options">
          <p style={{color:"white"}}>OR REGISTER USING</p>
          <div id="google-btn" style={{marginTop:"40px",height:"260px"}}></div>
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
  );
}
