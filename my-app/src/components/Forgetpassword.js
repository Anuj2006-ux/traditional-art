import React, { useState } from 'react';
import logo from './logo.png'; // Replace with your actual logo path
import { Link } from 'react-router-dom';
import './Login.js';

export default function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    // Trigger backend API here
  };

  return (
    <>
      <style>{`
        .reset-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #fff;
          font-family: 'Segoe UI', sans-serif;
        }

        .reset-container {
          display: flex;
          max-width: 800px;
          width: 90%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
          background-color: #ffffff;
        }

        .logo-section {
          flex: 1;
          background-color: #f9f9f9;
          display: flex;
          align-items: center;
          justify-content: center;
          
        }

        .reset-logo {
          width: 140px;
          height: auto;
          border-radius: 50%;
        }

        .form-section {
          flex: 2;
          padding: 40px;
          text-align: center;
        }

        .brand-title {
          font-size: 24px;
          font-weight: bold;
          color: #111;
          margin-bottom: 20px;
        }

        .reset-heading {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 10px;
            color: #333;
        }

        .reset-subtext {
          color: #666;
          font-size: 14px;
          margin-bottom: 25px;
        }

        .reset-input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 20px;
          box-sizing: border-box;
        }

        .reset-button {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .reset-button:hover {
          background-color: #3a78c2;
        }

        .alt-login {
          margin-top: 20px;
        }

        .alt-login a {
          font-size: 14px;
          color: #4a90e2;
          text-decoration: none;
        }
      `}</style>

      <div className="reset-wrapper">
        <div className="reset-container">
          <div className="logo-section">
            <img src={logo} alt="Tradavya Logo" className="reset-logo " />
          </div>

          <div className="form-section">
            <h1 className="brand-title">Tradavya</h1>
            <h2 className="reset-heading"><strong>Reset your password</strong></h2>
            <p className="reset-subtext">
              We’ll email you a link to reset your password
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                className="reset-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="reset-button">
                Send email
              </button>
            </form>

            <div className="alt-login">
              {/* <a href="/login">Try a different login method</a> */}
              <Link to="/">Try a different login method</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
