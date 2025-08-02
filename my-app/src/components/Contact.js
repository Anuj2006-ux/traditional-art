import React, { useState } from "react";
import "./Contact.css";
import logo from "./logo.png"; // Ensure you have a logo image in the same directory

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would normally send the form data to a backend
  };

  return (
    <div className="cf-contact-main blue-theme">
      <div className="cf-contact-container blue-theme">
        {/* Left: Enlarged Illustration */}
        <div className="cf-contact-illustration large-illustration">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/customer-service-3485040-2912010.png?f=webp"
            alt="Contact Us Illustration"
          />
        </div>
        {/* Right: Form */}
        <div className="cf-contact-form-card">
          <h2>Contact Us</h2>
          <p>
            Submit your details and our team will get back to you as soon as possible.
          </p>
          {submitted ? (
            <div className="cf-success-message">
              Thank you! We'll get back to you soon.
            </div>
          ) : (
            <form className="cf-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </label>
              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </label>
              <label>
                Education
                <input
                  type="text"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  placeholder="Enter your education"
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your message"
                />
              </label>
              <button type="submit" className="cf-submit-btn blue-theme-btn">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="cf-footer">
        <div className="cf-footer-main">
          <div className="cf-footer-col cf-footer-logo">
            <div className="cf-logo">
              <span><img src={logo} style={{width:"95px",height:"95px",borderRadius:"50px"}}></img></span>
            </div>
            <p>
              Tradavya is an traditional art website which helps you to find
              similar art pieces from The Met Museum. Upload your art and discover the matching arts.
            </p>
          </div>
          <div className="cf-footer-col">
            <h4>Info</h4>
            <ul>
              <li>About</li>
              <li>Services</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="cf-footer-col">
            <h4>Support</h4>
            <ul>
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Terms</li>
              <li>Product Design</li>
            </ul>
          </div>
          <div className="cf-footer-col">
            <h4>Subscribe Now</h4>
            <form className="cf-footer-subscribe">
              <input type="email" placeholder="Email Address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="cf-footer-bottom">
          <span>
            &copy; 2025 All rights reserved. Created for demonstration.
          </span>
        </div>
      </footer>
    </div>
  );
}