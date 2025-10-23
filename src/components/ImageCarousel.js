// components/ImageCarousel.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({ images, openLightbox }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imagesPerView = 2;
  
  // Only render if we have images
  if (!images || images.length === 0) {
    return null;
  }
  
  // Calculate the total number of images and pages
  const imageCount = images.length;
  const pageCount = Math.ceil(imageCount / imagesPerView);
  
  // Function to handle next slide
  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= pageCount ? 0 : nextIndex;
    });
    
    // Reset transitioning flag after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Function to handle previous slide
  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? pageCount - 1 : nextIndex;
    });
    
    // Reset transitioning flag after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Function to navigate to a specific slide
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset transitioning flag after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Create an array of all possible slides
  const slides = [];
  for (let i = 0; i < pageCount; i++) {
    const slideImages = [];
    
    for (let j = 0; j < imagesPerView; j++) {
      const imageIndex = i * imagesPerView + j;
      if (imageIndex < imageCount) {
        slideImages.push({
          image: images[imageIndex],
          originalIndex: imageIndex
        });
      }
    }
    
    slides.push(slideImages);
  }
  
  return (
    <div className={styles.carouselContainer}>
      {pageCount > 1 && (
        <button
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous images"
          disabled={isTransitioning}
        >
          &#10094;
        </button>
      )}
      
      <div className={styles.carouselWindow}>
        <div 
          className={styles.carouselTrack}
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease' : 'none'
          }}
        >
          {slides.map((slide, slideIndex) => (
            <div 
              key={`slide-${slideIndex}`}
              className={styles.carouselSlide}
            >
              {slide.map((item, itemIndex) => {
                const { width, height } = item.image.asset.metadata?.dimensions || { width: 800, height: 600 };
                
                return (
                  <div 
                    key={`image-${item.originalIndex}`}
                    className={styles.carouselItem}
                    onClick={() => openLightbox(item.originalIndex)}
                  >
                    <Image
                      src={item.image.asset.url}
                      alt={`Film still ${item.originalIndex + 1}`}
                      width={width}
                      height={height}
                      className={styles.carouselImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {pageCount > 1 && (
        <button
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next images"
          disabled={isTransitioning}
        >
          &#10095;
        </button>
      )}
      
      {pageCount > 1 && (
        <div className={styles.carouselDots}>
          {Array.from({ length: pageCount }).map((_, idx) => (
            <span
              key={`dot-${idx}`}
              className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
              onClick={() => goToSlide(idx)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}