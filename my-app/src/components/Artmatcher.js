import React, { useState } from "react";
import "./Artmatcher.css";

export default function ArtMatcher() {
  const [caption, setCaption] = useState("");
  const [matchedArts, setMatchedArts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    setMatchedArts([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim()) return;
    setLoading(true);
    setMatchedArts([]);
    try {
      const res = await fetch("http://localhost:3001/search-met", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption }),
      });
      const data = await res.json();
      setMatchedArts(data.results || []);
    } catch (err) {
      alert("Error finding art. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="artmatcher-container">
      <h1 className="main-title">ArtMatcher</h1>
      <p className="subtitle">
        Describe an artwork, scene, or subject. Discover masterpieces from The Met Museum that match your imagination!
      </p>
      <form className="matcher-form" onSubmit={handleSubmit}>
        <textarea
          className="caption-input"
          placeholder="Type a description, e.g. 'golden Egyptian mask' or 'sunlit landscape with trees and river'..."
          value={caption}
          onChange={handleCaptionChange}
          rows={3}
        />
        <button
          type="submit"
          disabled={loading || !caption.trim()}
          className="match-btn"
        >
          {loading ? "Searching..." : "Find Matching Art"}
        </button>
      </form>
      <div className="results-row">
        {matchedArts.length > 0 ? (
          matchedArts.map((art) => (
            <div className="card" key={art.objectID}>
              <img
                src={art.image}
                alt={art.title}
                className="preview-img"
                loading="lazy"
              />
              <div className="art-info">
                <strong>{art.title}</strong>
                <br />
                {art.artist && <span>by {art.artist}</span>}
                <br />
                {art.objectDate && <em>{art.objectDate}</em>}
                <br />
                <a
                  href={art.objectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on The Met
                </a>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className="no-results">
              {caption.trim() && "No matching art found. Try another description!"}
            </div>
          )
        )}
      </div>
    </div>
  );
}