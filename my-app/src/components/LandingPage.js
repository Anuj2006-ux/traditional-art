import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-root">
      <header>
        <nav>
          <ul className="nav-menu">
            <li><a href="#">About</a></li>
            <li><a href="#">Illustration</a></li>
            <li><a href="#">Design & Dev</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Your Name</h1>
            <h2>Illustration and Development</h2>
            <button className="explore-btn">Explore</button>
            <p className="subtext">Explore without sound</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;