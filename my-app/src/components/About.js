import React from "react";
import "./About.css";
import Contact from "./Contact";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Shopping from "./Shopping";

export default function ContactUs() {
  const navigate = useNavigate();
  const send = () => {
    navigate("/Contact");
  };
  const support = () => {
    navigate("/Supportpage");
  };
  const sal = () => {
    navigate("/Shopping");
  };
  return (
    <>
      <Navbar />
      <div className="contactus-page">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Have any questions? We'd love to hear from you.
        </p>
        <div className="contactus-cards-row">
          <div className="contactus-card card-press">
            <h2>Be a part</h2>
            <p>
              Are you interested in our latest news or working on a story and need to get in touch?
            </p>
            <a className="contact-btn press-btn" href="#press" onClick={send}>
              Submit form
            </a>
          </div>
          <div className="contactus-card card-support contactus-card-middle">
            <h2>Help &amp; Support</h2>
            <p>
              Our support team is spread across the globe to give you answers fast.
            </p>
            <a className="contact-btn support-btn" href="#support" onClick={support}>
              Visit Support Page
            </a>
            <a className="contact-link" href="#submit-request" onClick={support}>
              SUBMIT any problem
            </a>
          </div>
          <div className="contactus-card card-sales">
            <h2>Sales</h2>
            <p>
              Get in touch with our sales team to see how we can work together.
            </p>
            <a className="contact-btn sales-btn" href="#sales" onClick={sal}>
              show Sales
            </a>
          </div>
        </div>

        {/* Divider to separate cards and Tradavya section */}
        <hr style={{ margin: "180px 0", borderTop: "4px solid #000" }} />

        {/* Tradavya Section */}
        <div
          className="tradavya-section"
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginTop: "0"
          }}
        >
          <div
            style={{
              flex: "0 0 300px",
              marginRight: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <h1
              style={{
                fontFamily: "serif",
                fontWeight: "bolder",
                color: "#10b568ff",
                marginBottom: "0px",
                marginTop: "-110px", // Move heading up
                textAlign: "left"
              }}
            >
              Tradavya:
            </h1>
          </div>
          <div
            style={{
              flex: "1",
              position: "relative",
              marginTop: "0px", // Move text further down from heading
            }}
            className="content"
          >
            <p style={{ fontSize: "19px", color: "white" }}>
              Tradavya is a platform devoted to celebrating and preserving traditional art forms from across the world. Inspired by the richness of heritage and the stories woven into every piece, Tradavya began as a small community of passionate artists and art lovers. Our journey started with a simple vision: to bring the beauty of traditional arts into the digital age, making it accessible to everyone while supporting local artisans and reviving age-old techniques. Whether you’re an artist, a collector, or simply an admirer, Tradavya is your gateway to the vibrant world of traditional art.
            </p>
          </div>
        </div>
        {/* End of Tradavya Section */}
        <Footer/>
      </div>
    </>
  );
}