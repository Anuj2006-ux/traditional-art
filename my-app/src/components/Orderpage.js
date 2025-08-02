import React, { useState } from "react";
import "./Orderpage.css";
import Navbar from "./Navbar";

// Four traditional art images (royalty-free, no faces)
const ORDER_IMAGES = [
  {
    url: "https://www.artsoullifemagazine.com/wp-content/uploads/2023/09/Image-01-2.jpg",
    title: "The Great Wave off Kanagawa",
    artist: "By Hokusai",
    size: "M",
    qty: 1,
    price: 1250,
  },
  {
    url: "https://shop.musepaintbar.com/cdn/shop/products/MonetSunrise_6d6386a0-dbca-4789-b58c-3d05ae76e30f_600x.png?v=1611649427",
    title: "Impression, Sunrise",
    artist: "By Claude Monet",
    size: "L",
    qty: 1,
    price: 1760,
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS2fFKilwxOd0ZRv7ECG--12_Jlw1V6v1DiQ&s",
    title: "Starry Night",
    artist: "By Vincent van Gogh",
    size: "S",
    qty: 1,
    price: 1450,
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HPiDHNbFjSxwMTfoSPcKpDnHoz84WbAi1Q&s",
    title: "The Kiss",
    artist: "By Gustav Klimt",
    size: "M",
    qty: 1,
    price: 1650,
  }
];

const ORDER_DATA = {
  orderId: "#982374915036",
  date: "Thu, 17th Nov 24",
  status: "In - Transit",
  delivery: "24 August 2025",
  items: ORDER_IMAGES
};

export default function OrderPage() {
  const [order, setOrder] = useState({ ...ORDER_DATA });
  const [selectedArt, setSelectedArt] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelCandidate, setCancelCandidate] = useState(null);
  const [showTrackModal, setShowTrackModal] = useState(false);

  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  // Remove selected image from order
  function removeItem() {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== cancelCandidate),
    }));
    setShowCancelModal(false);
    setCancelCandidate(null);
  }

  return (
    <>
    <Navbar/>
    <div className="order-page-root">
      <div className="order-page-head">
        <h1 className="order-page-title" >My Orders<center/></h1>
       <p
  className="order-page-desc"
  style={{ color: "black" }}
>
  <h5>
  View and edit all your pending, delivered, and returned orders here.
 </h5> <center />
</p>

      </div>
      <div className="order-card">
        <div className="order-card-top">
          <span className="order-card-id">
            Order <a className="order-link" href="#"> {order.orderId} </a>
          </span>
          <span className="order-card-date">Order Placed: {order.date}</span>
          <button className="track-order-btn" onClick={() => setShowTrackModal(true)}>Track Order</button>
        </div>
        <div className="order-list">
          {order.items.map((item, idx) => (
            <div className="order-item" key={idx}>
              <div
                className="order-item-image"
                onClick={() => { setSelectedArt(item); setZoomed(false); }}>
                <img src={item.url} alt={item.title} />
              </div>
              <div className="order-item-info">
                <div className="order-item-title">{item.title}</div>
                <div className="order-item-artist">{item.artist}</div>
                <div className="order-item-details">
                  <span>Size: {item.size}</span>
                  <span>Qty: {item.qty}</span>
                  <span className="order-item-price">Rs. {item.price}</span>
                </div>
                <div className="order-item-status-row">
                  <span className="order-item-status-label">Status</span>
                  <span className="order-item-status in-transit">{order.status}</span>
                  <span className="order-item-delivery">
                    Delivery Expected by <b>{order.delivery}</b>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-footer-row">
          <button
            className="cancel-order-btn"
            onClick={() => setShowCancelModal(true)}
            disabled={order.items.length === 0}
          >
            × Cancel Order
          </button>
          <span className="order-footer-payment" style={{ color: "red" }}>
            Paid using credit card ending with 2543
          </span>
          <span className="order-footer-total">
            <b>Rs. {total}</b>
          </span>
        </div>
      </div>

      {/* Image Popup */}
      {selectedArt && (
        <div className="order-modal" onClick={() => { setSelectedArt(null); setZoomed(false); }}>
          <div className="order-modal-content" onClick={e => e.stopPropagation()}>
            <div className="order-modal-img-wrap" onClick={() => setZoomed(z => !z)}>
              <img
                src={selectedArt.url}
                alt={selectedArt.title}
                className={zoomed ? "zoomed" : ""}
              />
              <span className="zoom-indicator">{zoomed ? "🔎-" : "🔎+"}</span>
            </div>
            <div className="order-modal-details">
              <h2>{selectedArt.title}</h2>
              <p><strong>Artist:</strong> {selectedArt.artist}</p>
              <p><strong>Size:</strong> {selectedArt.size}</p>
              <p><strong>Price:</strong> Rs. {selectedArt.price}</p>
              <button className="order-modal-close" onClick={() => setSelectedArt(null)}>Close</button>
              <p className="zoom-hint">Click image to {zoomed ? "zoom out" : "zoom in"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="order-modal" onClick={() => setShowCancelModal(false)}>
          <div className="order-cancel-modal-content" onClick={e => e.stopPropagation()}>
            <h3>Select the image you want to cancel:</h3>
            <div className="cancel-image-list">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`cancel-image-thumb ${cancelCandidate === idx ? "selected" : ""}`}
                  onClick={() => setCancelCandidate(idx)}
                >
                  <img src={item.url} alt={item.title} />
                  <div className="cancel-thumb-title">{item.title}</div>
                </div>
              ))}
            </div>
            <div className="cancel-modal-actions">
              <button
                className="cancel-modal-btn"
                disabled={cancelCandidate === null}
                onClick={removeItem}
              >
                Remove Selected
              </button>
              <button className="cancel-modal-btn secondary" onClick={() => setShowCancelModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      {showTrackModal && (
        <div className="order-modal" onClick={() => setShowTrackModal(false)}>
          <div className="order-track-modal-content" onClick={e => e.stopPropagation()}>
            <h3>Track Order</h3>
            <div className="fake-map">
              <div className="map-background">
                <div className="map-route"></div>
                <div className="map-pin map-pin-start">🛒</div>
                <div className="map-pin map-pin-end">🏠</div>
              </div>
              <div className="map-labels">
                <span>Warehouse</span>
                <span>Out for Delivery</span>
              </div>
            </div>
            <button className="order-modal-close" onClick={() => setShowTrackModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}