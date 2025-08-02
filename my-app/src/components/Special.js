import React, { useEffect, useState, useCallback } from 'react';
import Navbar2 from './Navbar';
import Footer from './Footer';
import './Shopping.css';
import Header from './Header.js';
import { useCart } from './CartContext';

export default function Shopping() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedArt, setSelectedArt] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const perPage = 9; // 3 images per row

  const { addToCart } = useCart();

  const generatePrice = () => Math.floor(Math.random() * 25000) + 5000;

  const fetchArts = useCallback(async (query = '', pageNum = 1) => {
    setLoading(true);
    try {
      let url;
      if (query && query.length > 0) {
        url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,image_id,artist_display,date_display&limit=100&page=${pageNum}`;
      } else {
        url = `https://api.artic.edu/api/v1/artworks?page=${pageNum}&limit=100&fields=id,title,image_id,artist_display,date_display`;
      }
      const res = await fetch(url);
      const data = await res.json();

      // Only keep artworks with image_id
      let arts = (data.data || []).filter(art => art.image_id);

      // Shuffle for randomness
      for (let i = arts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arts[i], arts[j]] = [arts[j], arts[i]];
      }
      arts = arts.slice(0, perPage);

      const formatted = arts.map((art) => ({
        id: art.id,
        title: art.title,
        artist: art.artist_display || 'Unknown',
        date: art.date_display || 'N/A',
        image: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
        price: generatePrice(),
      }));

      setArtworks(formatted);
      setTotalPages(10); // Or use data.pagination.total_pages if available
    } catch (error) {
      console.error('Failed to fetch artworks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArts(searchQuery, page);
  }, [fetchArts, searchQuery, page]);

  const handleSuggestionClick = (item) => {
    if (!item.image_id) return;
    setSelectedArt({
      id: item.id,
      title: item.title,
      artist: item.artist_display || 'Unknown',
      date: item.date_display || 'N/A',
      image: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
      price: generatePrice(),
    });
  };

  return (
    <>
      <Navbar2 />
      <Header onSearch={setSearchQuery} onSuggestionClick={handleSuggestionClick} />
      <div className="shopping-page">
        {loading ? (
          <div className="loading">🖼️ Loading...</div>
        ) : (
          <div className="grid-container">
            {artworks.map((art) => (
              <div key={art.id} className="art-card">
                <div
                  className="art-image-container"
                  onClick={() => { setSelectedArt(art); setZoomed(false); }}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="art-image"
                  />
                </div>
                <div className="art-info">
                  <h3>{art.title}</h3>
                  <p><strong>Artist:</strong> {art.artist}</p>
                  <p><strong>Date:</strong> {art.date}</p>
                  <p className="price">₹{art.price}</p>
                  <div className="button-group-centered">
                    <button className="buy-btn" onClick={() => alert(`You selected "${art.title}" for ₹${art.price}.`)}>Buy Now</button>
                    <button className="buy-btn btn2" onClick={() => { addToCart(art); alert("Item added to cart"); }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>←</button>
          <span style={{color:"white"}}> Page {page} of {totalPages} </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>→</button>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedArt && (
        <div className="modal" onClick={() => { setSelectedArt(null); setZoomed(false); }}>
          <div className="modal-content modal-feature" onClick={e => e.stopPropagation()}>
            <div className="modal-left">
              <div
                className={`modal-image-wrapper${zoomed ? ' zoomed' : ''}`}
                onClick={() => setZoomed(z => !z)}
                title={zoomed ? 'Click to zoom out' : 'Click to zoom in'}
              >
                <img
                  src={selectedArt.image}
                  alt={selectedArt.title}
                  className={`modal-image-feature${zoomed ? ' zoomed' : ''}`}
                  style={{
                    cursor: 'zoom-in',
                    transition: 'transform 0.35s cubic-bezier(.4,2,.6,1)',
                    zIndex: 1002
                  }}
                />
                <span className="zoom-indicator">{zoomed ? "🔎-" : "🔎+"}</span>
              </div>
            </div>
            <div className="modal-right">
              <h2>{selectedArt.title}</h2>
              <p><strong>Artist:</strong> {selectedArt.artist}</p>
              <p><strong>Date:</strong> {selectedArt.date}</p>
              <p className="price-big">₹{selectedArt.price}</p>
              <div className="button-group-centered">
                <button className="buy-btn" onClick={() => alert(`You selected "${selectedArt.title}" for ₹${selectedArt.price}.`)}>Buy Now</button>
                <button className="buy-btn btn2" onClick={() => { addToCart(selectedArt); alert("Item added to cart"); }}>Add to Cart</button>
                <button className="close-btn" onClick={() => { setSelectedArt(null); setZoomed(false); }}>Close</button>
              </div>
              <p className="zoom-hint">Click image to {zoomed ? "zoom out" : "zoom in"}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}