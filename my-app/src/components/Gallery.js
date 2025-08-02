import React, { useRef, useState, useEffect } from "react";
import "./Gallery.css";
import GalleryHeader from "./GalleryHeader";
import GalleryModal from "./GalleryModal";

// Sample images categorized by tag
const allGalleryItems = [
  // dances
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `dances${i+1}`,
    title: `Dance Art ${i+1}`,
    image: `https://picsum.photos/id/${i+20}/600/400`,
    author: `Dancer ${i+1}`,
    likes: Math.floor(Math.random() * 20) + 1,
    views: Math.floor(Math.random() * 9000) + 1000,
    comments: [],
    tag: "dances"
  })),
  // craftwork
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `craftwork${i+1}`,
    title: `Craftwork ${i+1}`,
    image: `https://picsum.photos/id/${i+40}/600/400`,
    author: `Crafter ${i+1}`,
    likes: Math.floor(Math.random() * 20) + 1,
    views: Math.floor(Math.random() * 9000) + 1000,
    comments: [],
    tag: "craftwork"
  })),
  // paintings
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `paintings${i+1}`,
    title: `Painting ${i+1}`,
    image: `https://picsum.photos/id/${i+60}/600/400`,
    author: `Painter ${i+1}`,
    likes: Math.floor(Math.random() * 20) + 1,
    views: Math.floor(Math.random() * 9000) + 1000,
    comments: [],
    tag: "paintings"
  })),
  // different arts
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `differentarts${i+1}`,
    title: `Art Form ${i+1}`,
    image: `https://picsum.photos/id/${i+80}/600/400`,
    author: `Artist ${i+1}`,
    likes: Math.floor(Math.random() * 20) + 1,
    views: Math.floor(Math.random() * 9000) + 1000,
    comments: [],
    tag: "different arts"
  })),
];

function GallerySection() {
  const galleryRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filterTag, setFilterTag] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Filter images by tag and search value
  const filteredItems = allGalleryItems.filter(item => {
    const tagMatch = filterTag ? item.tag === filterTag : true;
    const textMatch =
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.author.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchValue.toLowerCase());
    return tagMatch && textMatch;
  });

  // Scroll to gallery grid when Explore is pressed
  const scrollToGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTagClick = (tag) => {
    setFilterTag(tag);
    setSearchValue("");
    setSelectedIndex(null);
    scrollToGallery();
  };

  useEffect(() => {
    if (filteredItems.length === 0 && (filterTag || searchValue)) {
      setSelectedIndex(null);
    }
  }, [filterTag, searchValue, filteredItems.length]);

  return (
    <div>
      <GalleryHeader
        onTagClick={handleTagClick}
        onSearch={setSearchValue}
        searchValue={searchValue}
        scrollToGallery={scrollToGallery}
        filterTag={filterTag}
      />
      <div ref={galleryRef} className="gallery-section">
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => setSelectedIndex(idx)}
            >
              <img src={item.image} alt={item.title} className="gallery-image" />
              <div className="gallery-info">
                <h3 className="gallery-item-title">{item.title}</h3>
                <div className="gallery-meta">
                  <span className="gallery-author">{item.author}</span>
                  <div className="gallery-stats">
                    <button
                      className="like-btn"
                      onClick={e => { e.stopPropagation(); }}
                    >
                      <span role="img" aria-label="like">❤️</span> {item.likes}
                    </button>
                    <span className="views">
                      <span role="img" aria-label="views">👁️</span> {item.views >= 1000 ? `${(item.views/1000).toFixed(1)}k` : item.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {(selectedIndex !== null && filteredItems[selectedIndex]) && (
          <GalleryModal
            item={filteredItems[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            // You can add like/comment/download handlers here if needed
            onLike={() => {}}
            onComment={() => {}}
            onDownload={() => {}}
            onPrev={() => setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length)}
            onNext={() => setSelectedIndex((selectedIndex + 1) % filteredItems.length)}
            hasPrev={filteredItems.length > 1}
            hasNext={filteredItems.length > 1}
          />
        )}
      </div>
    </div>
  );
}

export default GallerySection;