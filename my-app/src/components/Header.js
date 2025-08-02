import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { FaBoxOpen, FaSearch, FaShoppingCart } from 'react-icons/fa';

export default function Header({ onSearch, onSuggestionClick }) {
  const { cartItems } = useCart();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_display,image_id,date_display&limit=10&page=1`;
        const res = await fetch(url);
        const data = await res.json();
        const items = (data.data || []).filter(
          art => (art.title || art.artist_display) && art.image_id // only with image
        );
        setSuggestions(items);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch) onSearch(query.trim());
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.title);
    setShowSuggestions(false);
    if (onSuggestionClick) onSuggestionClick(item);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuggestions]);

  return (
    <header className="header header-flex-row">
      <div className="header-left">
        <Link to="/order" className="order-link">
          <FaBoxOpen className="order-icon" />
          <span>Your Orders</span>
        </Link>
      </div>
      <form className="search-box" onSubmit={handleSubmit} autoComplete="off" ref={suggestionsRef}>
        <span className="search-icon-wrapper">
          <FaSearch className="search-icon" />
        </span>
        <input
          type="text"
          placeholder="Find artworks, artforms, artists & more..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          className="header-search-input"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="suggestion-item"
                onMouseDown={() => handleSuggestionClick(item)}
              >
                <span className="suggestion-title">{item.title}</span>
                {item.artist_display && (
                  <span className="suggestion-artist"> by {item.artist_display}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </form>
      <div className="header-right">
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
          <span>Cart ({cartItems.length})</span>
        </Link>
      </div>
    </header>
  );
}