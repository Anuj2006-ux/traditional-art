import React, { useState } from "react";
import "./GalleryModal.css";

function GalleryModal({
  item,
  onClose,
  onLike,
  onComment,
  onDownload,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const [commentText, setCommentText] = useState("");

  if (!item) return null;

  return (
    <div className="gallery-modal-overlay">
      <div className="gallery-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="gallery-modal-header">
          <h2>{item.title}</h2>
          <div className="gallery-modal-author">
            <span>{item.author}</span>
          </div>
        </div>
        <div className="gallery-modal-image-container">
          {hasPrev && (
            <button className="arrow-btn left" onClick={onPrev} aria-label="Previous">
              ←
            </button>
          )}
          <img src={item.image} alt={item.title} className="gallery-modal-image" />
          {hasNext && (
            <button className="arrow-btn right" onClick={onNext} aria-label="Next">
              →
            </button>
          )}
        </div>
        <div className="gallery-modal-actions">
          <button className="like-btn" onClick={onLike}>
            <span role="img" aria-label="like">❤️</span> Like ({item.likes})
          </button>
          <button className="download-btn" onClick={onDownload}>
            <span role="img" aria-label="download">⬇️</span> Download
          </button>
        </div>
        <div className="gallery-modal-comments">
          <h4>Comments</h4>
          <div className="comments-list">
            {item.comments.length === 0 ? <div>No comments yet.</div> :
              item.comments.map((c, idx) => (
                <div key={idx} className="comment-item">{c}</div>
              ))}
          </div>
          <form
            className="comment-form"
            onSubmit={e => {
              e.preventDefault();
              if (commentText.trim()) {
                onComment(commentText);
                setCommentText("");
              }
            }}
          >
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;