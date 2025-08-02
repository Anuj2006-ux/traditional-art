import React, { useState } from "react";
import "./Supportpage.css";
import{Link, useNavigate} from "react-router-dom";
import Login from "./Login";
import Footer from "./Footer";

// Problem-specific images (relevant art/tradition themed images)
const problemImages = {
  "/support/getting-started":
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "/support/art-submission":
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80",
  "/support/sharing-showcasing":
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
  "/support/pricing-payments":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  "/support/community":
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80",
  "/support/art-tracking":
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
  "/support/integrations":
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8a?auto=format&fit=crop&w=900&q=80",
  "/support/workshops-events":
    "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=900&q=80",
  "/support/safety-authenticity":
    "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=900&q=80",
};

const problemContents = {
  "/support/getting-started": {
    title: "Getting Started",
    text: "Welcome to Tradavya! To begin, create your account, explore featured traditional art, and follow our beginner’s guide to submit your first artwork or connect with artisans."
  },
  "/support/art-submission": {
    title: "Art Submission & Templates",
    text: "To submit your traditional art, go to the 'Submit Art' section. Download our submission template, fill in your artwork’s details, and upload high-quality images. Our team will review and display your art on Tradavya."
  },
  "/support/sharing-showcasing": {
    title: "Sharing & Showcasing",
    text: "Share your creations through your artist profile or showcase them in Tradavya’s curated galleries. Use the ‘Showcase’ button to feature your work or broadcast it to your social media accounts."
  },
  "/support/pricing-payments": {
    title: "Pricing & Payments",
    text: "Learn about membership fees, artist commissions for artwork sales, and secure payment methods. Visit your dashboard to manage payment settings and view your transaction history."
  },
  "/support/community": {
    title: "Tradavya Community",
    text: "Connect with fellow artists, join discussion forums, participate in group projects, and collaborate on traditional art initiatives. The community is open to all art lovers and creators."
  },
  "/support/art-tracking": {
    title: "Art Tracking",
    text: "Track your artwork’s submission status, sales, and exhibition history directly from your dashboard. Get notifications for reviews, approvals, or new exhibition opportunities."
  },
  "/support/integrations": {
    title: "Integrations",
    text: "Link your Tradavya profile with Instagram, Facebook, or other platforms to promote your art. Easily share updates and exhibitions with your followers."
  },
  "/support/workshops-events": {
    title: "Workshops & Events",
    text: "Sign up for live workshops, virtual art camps, and upcoming exhibitions. View schedules and register to join hands-on learning experiences with master artisans."
  },
  "/support/safety-authenticity": {
    title: "Safety & Authenticity",
    text: "We verify artworks to ensure authenticity and protect your creations. Report suspicious activities or copyright issues, and check our guidelines for keeping your art safe online."
  }
};

const categories = [
  {
    icon: "fa-book-open",
    title: "Getting Started",
    desc: "Begin your journey in traditional arts",
    path: "/support/getting-started",
  },
  {
    icon: "fa-pen-nib",
    title: "Art Submission & Templates",
    desc: "How to submit and present your artworks",
    path: "/support/art-submission",
  },
  {
    icon: "fa-share-square",
    title: "Sharing & Showcasing",
    desc: "Showcase your creations to the world",
    path: "/support/sharing-showcasing",
  },
  {
    icon: "fa-rupee-sign",
    title: "Pricing & Payments",
    desc: "Memberships, commissions, and transactions",
    path: "/support/pricing-payments",
  },
  {
    icon: "fa-users",
    title: "Tradavya Community",
    desc: "Connect, discuss, and collaborate with artists",
    path: "/support/community",
  },
  {
    icon: "fa-history",
    title: "Art Tracking",
    desc: "Track submissions, sales, and exhibition history",
    path: "/support/art-tracking",
  },
  {
    icon: "fa-link",
    title: "Integrations",
    desc: "Link social media, sell, and promote",
    path: "/support/integrations",
  },
  {
    icon: "fa-bolt",
    title: "Workshops & Events",
    desc: "Join live workshops and upcoming events",
    path: "/support/workshops-events",
  },
  {
    icon: "fa-shield-alt",
    title: "Safety & Authenticity",
    desc: "Protect your work and verify authenticity",
    path: "/support/safety-authenticity",
  },
];

function ProblemPopup({ open, onClose, title, text, image }) {
  if (!open) return null;
   
 
  return (
    <div className="supportcenter-popup-overlay" onClick={onClose}>
      <div
        className="supportcenter-popup supportcenter-popup-large"
        onClick={e => e.stopPropagation()}
      >
        <button className="supportcenter-popup-close" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        {image && (
          <div className="supportcenter-popup-imgbox">
            <img src={image} alt={title} />
          </div>
        )}
        <h2 className="supportcenter-popup-title-large">{title}</h2>
        <div className="supportcenter-popup-text-large">{text}</div>
      </div>
    </div>
  );
}

export default function SupportCenter() {
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState({ open: false, path: null });

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(search.trim().toLowerCase()) ||
      cat.desc.toLowerCase().includes(search.trim().toLowerCase())
  );

  const showPopup = (path) => setPopup({ open: true, path });
  const closePopup = () => setPopup({ open: false, path: null });

  const currentContent = problemContents[popup.path] || {};
  const currentImage = problemImages[popup.path];
  const navigate = useNavigate();
    const Sig = () => {
        navigate("/");
    };

  return (
    <div className="supportcenter-root">
      <div className="supportcenter-header">
        <div className="supportcenter-navbar">
          <div className="supportcenter-logo">
            <span role="img" aria-label="logo" style={{ fontSize: 20, marginRight: 8 }}>🎨</span>
            <b>Tradavya</b>
          </div>
          <nav className="supportcenter-links">
            {/* <a href="#">Help Center</a>
            <a href="#">Workshops</a>
            <a href="#">Artisans</a>
            <a href="#">Events</a>
            <a href="#">Updates</a> */}
            <button className="supportcenter-signin-btn" onClick={Sig}>Sign in</button>
            <select className="supportcenter-lang">
              <option>English</option>
            </select>
          </nav>
        </div>
        <div className="supportcenter-hero">
          <h1>How can we help you?</h1>
          <div className="supportcenter-searchbar">
            <input
              type="text"
              placeholder="Search for topics, guides, and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <main className="supportcenter-main">
        <div className="supportcenter-categories-grid">
          {filteredCategories.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#888", fontSize: "1.2rem" }}>
              No categories found.
            </div>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="supportcenter-category-card"
                onClick={() => showPopup(cat.path)}
                tabIndex={0}
                style={{ cursor: "pointer" }}
                onKeyDown={e => { if (e.key === "Enter") showPopup(cat.path); }}
              >
                <div className="supportcenter-category-icon">
                  <i className={`fa ${cat.icon}`}></i>
                </div>
                <div>
                  <div className="supportcenter-category-title">{cat.title}</div>
                  <div className="supportcenter-category-desc">{cat.desc}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <ProblemPopup
        open={popup.open}
        onClose={closePopup}
        title={currentContent.title}
        text={currentContent.text}
        image={currentImage}
      />
        <Footer />
    </div>
  );
}