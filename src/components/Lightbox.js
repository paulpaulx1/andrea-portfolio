// components/Lightbox.jsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

export default function Lightbox({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [animationKey, setAnimationKey] = useState(0);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setAnimationKey(prev => prev + 1);
  };
  
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setAnimationKey(prev => prev + 1);
  };
  
  if (!images || images.length === 0) {
    return null;
  }
  
  const currentImage = images[currentIndex];
  const { width, height } = currentImage.asset.metadata?.dimensions || { width: 1200, height: 800 };
  
  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.lightboxImageContainer}>
          <Image
            key={animationKey}
            src={currentImage.asset.url}
            alt={`Film still ${currentIndex + 1}`}
            width={width}
            height={height}
            className={styles.lightboxImage}
            sizes="100vw"
            priority
          />
          
          <div className={styles.lightboxControls}>
            <button 
              className={`${styles.lightboxButton} ${styles.prevButton}`}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            
            <button 
              className={`${styles.lightboxButton} ${styles.nextButton}`}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              &#10095;
            </button>
          </div>
          
          <div className={styles.imageCounter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}