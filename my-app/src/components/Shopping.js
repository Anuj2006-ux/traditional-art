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

  // Helper for shuffling
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fetchArts = useCallback(async (query = '', pageNum = 1) => {
    setLoading(true);
    try {
      const q = query && query.length > 0 ? query : 'India';
      // Step 1: Search for matching Indian artworks (with images)
      const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(q)}&hasImages=true`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      let objectIDs = Array.isArray(searchData.objectIDs) ? searchData.objectIDs : [];
      // Shuffle all objectIDs on every fetch so every page gets a different random subset
      objectIDs = shuffleArray(objectIDs);

      const itemsPerPage = perPage;
      const start = (pageNum - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pagedObjectIDs = objectIDs.slice(start, end);

      const arts = await Promise.all(
        pagedObjectIDs.map(async (id) => {
          const objUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
          const objRes = await fetch(objUrl);
          return objRes.json();
        })
      );

      let filteredArts = arts.filter(
        art => art.primaryImageSmall && art.title
      );

      // (Optional: shuffle again if you want to shuffle within the page)
      // filteredArts = shuffleArray(filteredArts);

      const formatted = filteredArts.map((art) => ({
        id: art.objectID,
        title: art.title,
        artist: art.artistDisplayName || 'Unknown',
        date: art.objectDate || 'N/A',
        image: art.primaryImageSmall,
        price: generatePrice(),
      }));

      setArtworks(formatted);
      setTotalPages(Math.ceil((objectIDs.length || 0) / itemsPerPage));
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
    if (!item.primaryImageSmall) return;
    setSelectedArt({
      id: item.objectID,
      title: item.title,
      artist: item.artistDisplayName || 'Unknown',
      date: item.objectDate || 'N/A',
      image: item.primaryImageSmall,
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