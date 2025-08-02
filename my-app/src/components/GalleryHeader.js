import React from "react";
import "./GalleryHeader.css";

function GalleryHeader({ onTagClick, onSearch, searchValue, scrollToGallery, filterTag }) {
  return (
    <div className="gallery-header-wrapper">
      <header className="gallery-header">
        <div className="logo-area">
          <span className="tradavaya-logo">tradavaya</span>
        </div>
        <div className="search-bar-area">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search images, tags, author..."
              value={searchValue}
              onChange={e => onSearch(e.target.value)}
            />
            <span className="search-x" onClick={() => onSearch("")}>×</span>
            <button className="search-btn">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" fill="none" />
                <line x1="15" y1="15" x2="11.5" y2="11.5" stroke="white" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="gallery-nav">
          <button className="explore-btn login-btn" onClick={scrollToGallery}>Explore ▾</button>
          <a className="shop-link" href="#">Shop</a>
          <a href="#">Hire a Designer ▾</a>
        </nav>
        <div className="account-area">
          <a href="#" className="signup-link">Sign up</a>
          <a href="#" className="login-btn">Log in</a>
        </div>
      </header>
      <div className="gallery-header-desc">
        <div className="gallery-desc-title">
          modern gallery section
        </div>
        <div className="gallery-desc-tags-row">
          {["dances", "craftwork", "paintings", "different arts"].map(tag => (
            <div
              className={`gallery-tag-box${filterTag === tag ? " active" : ""}`}
              key={tag}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryHeader;