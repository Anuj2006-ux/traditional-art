import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Productpage.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);

  useEffect(() => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      .then(res => res.json())
      .then(data => setArt(data));
  }, [id]);

  if (!art) return <div>Loading...</div>;

  return (
    <div className="detail-container">
      <div className="detail-left">
        <img src={art.primaryImage} alt={art.title} className="detail-image" />
        <div className="thumbnail-row">
          {art.additionalImages?.slice(0, 4).map((url, i) => (
            <img key={i} src={url} alt={`extra-${i}`} className="thumbnail" />
          ))}
        </div>
      </div>
      <div className="detail-right">
        <h1>{art.title}</h1>
        <p><strong>Artist:</strong> {art.artistDisplayName || 'Unknown'}</p>
        <p><strong>Department:</strong> {art.department}</p>
        <p><strong>Medium:</strong> {art.medium}</p>
        <p><strong>Dimensions:</strong> {art.dimensions}</p>
        <p>{art.creditLine}</p>
      </div>
    </div>
  );
}
