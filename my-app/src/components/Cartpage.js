import React, { useState } from 'react';
import { useCart } from './CartContext';
import Navbar2 from './Navbar';
import Footer from './Footer';
import './Cartpage.css';
import './Footer.css';

export default function CartPage() {
  const { cartItems, setCartItems } = useCart();
  const [popupItem, setPopupItem] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <>
      <Navbar2 />
      <div className="cart-bg-pattern">
        <div className="cart-page-root">
          <div className="cart-page-head">
            <h1 className="cart-page-title">My Cart</h1>
            <p className="cart-page-desc">
              Review your selected items and proceed to checkout. You can remove items or buy them here.
            </p>
          </div>
          <div className="cart-card">
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <h2>Your cart is empty.</h2>
              </div>
            ) : (
              <div className="cart-list">
                {cartItems.map((item, idx) => (
                  <div className="cart-item cart-item-style" key={idx}>
                    <div
                      className="cart-item-image cart-img-style"
                      onClick={() => { setPopupItem(item); setZoomed(false); }}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-artist">By {item.artist}</div>
                      <div className="cart-item-details">
                        <span>Size: {item.size || "M"}</span>
                        <span>Qty: 1</span>
                        <span className="cart-item-price">Rs. {item.price}</span>
                      </div>
                      <div className="cart-actions">
                        <button className="yellow-btn" onClick={() => handleRemove(idx)}>
                          REMOVE
                        </button>
                        <button className="yellow-btn btn3" onClick={() => alert(`You bought "${item.title}" for ₹${item.price}!`)}>BUY</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="cart-summary">
                  <div className="summary-box">
                    <p className="free-delivery" style={{color:'#454545'}}>✔️ Your order is eligible for <strong>FREE Delivery</strong></p>
                    <h3>Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}):</h3>
                    <h2>₹{totalPrice.toLocaleString()}</h2>
                    <button className="checkout-btn" onClick={()=>alert("Items purchased!")}>Proceed to Buy</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Popup for image zoom/details */}
        {popupItem && (
          <div className="cart-modal" onClick={() => { setPopupItem(null); setZoomed(false); }}>
            <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
              <div className="cart-modal-img-wrap" onClick={() => setZoomed(z => !z)}>
                <img
                  src={popupItem.image}
                  alt={popupItem.title}
                  className={zoomed ? "zoomed" : ""}
                />
                <span className="zoom-indicator">{zoomed ? "🔎-" : "🔎+"}</span>
              </div>
              <div className="cart-modal-details">
                <h2>{popupItem.title}</h2>
                <p><strong>Artist:</strong> {popupItem.artist}</p>
                <p><strong>Size:</strong> {popupItem.size || "M"}</p>
                <p><strong>Price:</strong> Rs. {popupItem.price}</p>
                <button className="cart-modal-close" onClick={() => setPopupItem(null)}>Close</button>
                <p className="zoom-hint">Click image to {zoomed ? "zoom out" : "zoom in"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}