import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li>About us</li>
            <li>Blog</li>
            <li>Commissioned Artworks</li>
            <li>Community</li>
            <li>Contact us</li>
            <li>Earn Rewards</li>
            <li>News & Events</li>
            <li>Refund policy</li>
            <li>Shipping & Returns</li>
            <li>Shop</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          {/* <p><strong>Customer Queries - </strong><a href="mailto:wecare@memeraki.com">wecare@memeraki.com</a></p> */}
          <p><strong>WhatsApp - </strong>+91 99715 93574</p>
          <p><strong>Mailing Address - </strong><br />
            MeMeraki Retail and Tech Pvt Ltd<br />
            326, 3rd Floor, Centrum Plaza, Golf Course Road,<br />
            Near Sector 54 Chowk Metro Station,<br />
            Gurugram, Haryana (122002), India
          </p>
        </div>

        <div className="footer-column">
          <h4>Connect with us</h4>
          <div className="newsletter-box">
            <input type="email" placeholder="Join our mailing list" />
            <button>Join</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <i className="fab fa-facebook-f" />
          <i className="fab fa-instagram" />
          <i className="fab fa-twitter" />
          <i className="fab fa-pinterest" />
          <i className="fab fa-youtube" />
        </div>
        <div className="footer-note">
          © {new Date().getFullYear()} MeMeraki Retail and Tech Pvt Ltd
        </div>
        <div className="trust-icons">
          <span>🌐 International Shipping</span>
          <span>✅ Authentic Handcrafted Artwork</span>
          <div className="payment-icons">
            <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" />
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/google-pay.png" alt="Google Pay" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" />
          </div>
        </div>
      </div>
    </footer>
  );
}
