'use client';

// components/SmoothCarousel.jsx
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './SmoothCarousel.module.css';

export default function SmoothCarousel({ images, autoplaySpeed = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const slidesRef = useRef([]);
  const timerRef = useRef(null);
  const isDownRef = useRef(false);
  const deltaXRef = useRef(0);
  const startXRef = useRef(0);
  const activePointerRef = useRef(null);
  const widthRef = useRef(0);
  
  // Constants
  const SPEED_SLIDE_MS = 600; // Duration of slide transition
  const SPEED_SNAP_MS = 300;  // Duration of snap-back animation
  
  // Initialize carousel
  useEffect(() => {
    if (!carouselRef.current || !images || images.length === 0) return;
    
    // Create a reference to all slide elements
    slidesRef.current = Array.from(carouselRef.current.querySelectorAll(`.${styles.slide}`));
    
    // Set up initial slide positions
    setupSlidePositions();
    
    // Start the autoplay timer
    startTimer();
    
    // Add keyboard navigation
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      clearTimer();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [images]);
  
  // Timer functions
  const startTimer = () => {
    clearTimer();
    if (autoplaySpeed > 0 && images && images.length > 1) {
      timerRef.current = setTimeout(() => goNext(), autoplaySpeed);
    }
  };
  
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  
  // Set up initial slide positions
  const setupSlidePositions = () => {
    if (!slidesRef.current) return;
    
    slidesRef.current.forEach((slide, index) => {
      // Position all slides off-screen initially, except the active one
      if (index === currentIndex) {
        slide.classList.add(styles.active);
      } else {
        resetSlideToRight(slide);
      }
    });
  };
  
  // Position helpers
  const resetSlideToRight = (slide) => {
    if (!slide) return;
    
    slide.classList.remove(styles.active, styles.leaving);
    slide.style.transition = "none";
    slide.style.transform = "translateX(112%) scale(1.05)"; // Park right (beyond visible area)
    
    // Force reflow to apply the style immediately
    void slide.offsetHeight;
    slide.style.transition = "";
  };
  
  const resetSlideToLeft = (slide) => {
    if (!slide) return;
    
    slide.classList.remove(styles.active, styles.leaving);
    slide.style.transition = "none";
    slide.style.transform = "translateX(-112%) scale(1.05)"; // Park left (beyond visible area)
    
    // Force reflow to apply the style immediately
    void slide.offsetHeight;
    slide.style.transition = "";
  };
  
  // Navigation
  const goNext = (startDelta = 0) => {
    if (!carouselRef.current || !slidesRef.current || images.length <= 1) return;
    
    clearTimer();
    
    const width = carouselRef.current.clientWidth || 1;
    const slides = slidesRef.current;
    const current = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const incoming = slides[nextIndex];
    
    // Reset classes
    current.classList.remove(styles.active, styles.leaving);
    incoming.classList.remove(styles.active, styles.leaving);
    
    // Calculate starting position based on drag
    const start = Math.max(-width, Math.min(0, startDelta || 0));
    
    // Set initial positions without transitions
    current.style.transition = "none";
    incoming.style.transition = "none";
    current.style.transform = `translateX(${start}px) scale(1.05)`;
    incoming.style.transform = `translateX(${width + start}px) scale(1.05)`;
    
    // Force reflow
    void current.offsetHeight;
    void incoming.offsetHeight;
    
    // Animate with transitions
    requestAnimationFrame(() => {
      // Calculate duration based on how far we've already dragged
      const frac = Math.max(0.15, Math.min(1, (width - Math.abs(start)) / width));
      const dur = Math.round(SPEED_SLIDE_MS * frac);
      
      current.style.transition = `transform ${dur}ms ease`;
      incoming.style.transition = `transform ${dur}ms ease`;
      
      current.style.transform = `translateX(${-width}px) scale(1.05)`;
      incoming.style.transform = `translateX(0) scale(1.05)`;
      
      // After animation completes
      const onTransitionEnd = (e) => {
        if (e.propertyName !== "transform") return;
        current.removeEventListener("transitionend", onTransitionEnd);
        
        current.style.transition = "";
        incoming.style.transition = "";
        
        resetSlideToRight(current);
        incoming.classList.add(styles.active);
        
        setCurrentIndex(nextIndex);
        startTimer();
      };
      
      current.addEventListener("transitionend", onTransitionEnd);
    });
  };
  
  const goPrev = (startDelta = 0) => {
    if (!carouselRef.current || !slidesRef.current || images.length <= 1) return;
    
    clearTimer();
    
    const width = carouselRef.current.clientWidth || 1;
    const slides = slidesRef.current;
    const current = slides[currentIndex];
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const incoming = slides[prevIndex];
    
    // Reset classes
    current.classList.remove(styles.active, styles.leaving);
    incoming.classList.remove(styles.active, styles.leaving);
    
    // Calculate starting position based on drag
    const start = Math.max(0, Math.min(width, startDelta || 0));
    
    // Set initial positions without transitions
    current.style.transition = "none";
    incoming.style.transition = "none";
    current.style.transform = `translateX(${start}px) scale(1.05)`;
    incoming.style.transform = `translateX(${-width + start}px) scale(1.05)`;
    
    // Force reflow
    void current.offsetHeight;
    void incoming.offsetHeight;
    
    // Animate with transitions
    requestAnimationFrame(() => {
      // Calculate duration based on how far we've already dragged
      const frac = Math.max(0.15, Math.min(1, (width - Math.abs(start)) / width));
      const dur = Math.round(SPEED_SLIDE_MS * frac);
      
      current.style.transition = `transform ${dur}ms ease`;
      incoming.style.transition = `transform ${dur}ms ease`;
      
      current.style.transform = `translateX(${width}px) scale(1.05)`;
      incoming.style.transform = `translateX(0) scale(1.05)`;
      
      // After animation completes
      const onTransitionEnd = (e) => {
        if (e.propertyName !== "transform") return;
        current.removeEventListener("transitionend", onTransitionEnd);
        
        current.style.transition = "";
        incoming.style.transition = "";
        
        resetSlideToRight(current);
        incoming.classList.add(styles.active);
        
        setCurrentIndex(prevIndex);
        startTimer();
      };
      
      current.addEventListener("transitionend", onTransitionEnd);
    });
  };
  
  // Snap back to original position if drag isn't far enough
  const snapBack = (fromDelta) => {
    if (!carouselRef.current || !slidesRef.current || images.length <= 1) return;
    
    const width = carouselRef.current.clientWidth || 1;
    const slides = slidesRef.current;
    const current = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextSlide = slides[nextIndex];
    const prevSlide = slides[prevIndex];
    
    // Calculate duration based on how far we've dragged
    const frac = Math.max(0.1, Math.min(1, Math.abs(fromDelta) / width));
    const dur = Math.round(SPEED_SNAP_MS * frac);
    
    // Add transitions to all involved slides
    [current, nextSlide, prevSlide].forEach((slide) => {
      slide.style.transition = `transform ${dur}ms ease`;
    });
    
    // Animate back to original positions
    current.style.transform = `translateX(0) scale(1.05)`;
    nextSlide.style.transform = `translateX(${width}px) scale(1.05)`;
    prevSlide.style.transform = `translateX(${-width}px) scale(1.05)`;
    
    // After animation completes
    const onTransitionEnd = (e) => {
      if (e.propertyName !== "transform") return;
      current.removeEventListener("transitionend", onTransitionEnd);
      
      [current, nextSlide, prevSlide].forEach((slide) => {
        slide.style.transition = "";
      });
      
      resetSlideToRight(nextSlide);
      resetSlideToLeft(prevSlide);
      current.classList.add(styles.active);
      
      startTimer();
    };
    
    current.addEventListener("transitionend", onTransitionEnd);
  };
  
  // Event handlers
  const handlePointerDown = (e) => {
    if (!carouselRef.current || images.length <= 1) return;
    
    // Store the pointer ID for tracking this specific touch/pointer
    activePointerRef.current = e.pointerId;
    carouselRef.current.setPointerCapture(activePointerRef.current);
    
    clearTimer();
    isDownRef.current = true;
    deltaXRef.current = 0;
    startXRef.current = e.clientX;
    widthRef.current = carouselRef.current.clientWidth || 1;
    
    carouselRef.current.classList.add(styles.dragging);
    
    const slides = slidesRef.current;
    const width = widthRef.current;
    
    // Get indexes for adjacent slides
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    // Park slides beyond visible area to prevent peeking
    resetSlideToRight(slides[nextIndex]);
    resetSlideToLeft(slides[prevIndex]);
    
    // Position for immediate dragging (no gap)
    slides[currentIndex].style.transition = "none";
    slides[nextIndex].style.transition = "none";
    slides[prevIndex].style.transition = "none";
    
    // Position precisely at 100% (not 112%) for seamless dragging
    slides[nextIndex].style.transform = `translateX(${width}px) scale(1.05)`;
    slides[prevIndex].style.transform = `translateX(${-width}px) scale(1.05)`;
    
    e.preventDefault();
  };
  
  const handlePointerMove = (e) => {
    if (!isDownRef.current || activePointerRef.current !== e.pointerId) return;
    
    // Calculate how far we've dragged
    deltaXRef.current = e.clientX - startXRef.current;
    
    const slides = slidesRef.current;
    const width = widthRef.current;
    
    // Get indexes for adjacent slides
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    // Update positions of all three slides based on drag distance
    slides[currentIndex].style.transform = `translateX(${deltaXRef.current}px) scale(1.05)`;
    slides[nextIndex].style.transform = `translateX(${width + deltaXRef.current}px) scale(1.05)`;
    slides[prevIndex].style.transform = `translateX(${-width + deltaXRef.current}px) scale(1.05)`;
  };
  
  const handlePointerUp = (e) => {
    if (!isDownRef.current || activePointerRef.current !== e.pointerId) return;
    
    isDownRef.current = false;
    if (carouselRef.current) {
      carouselRef.current.classList.remove(styles.dragging);
      carouselRef.current.releasePointerCapture(activePointerRef.current);
    }
    
    activePointerRef.current = null;
    
    // Threshold for advancing to next/prev slide (pixels or % of width)
    const threshold = Math.min(80, widthRef.current * 0.12);
    
    if (deltaXRef.current < -threshold) {
      // Dragged left far enough - go to next slide
      goNext(deltaXRef.current);
    } else if (deltaXRef.current > threshold) {
      // Dragged right far enough - go to previous slide
      goPrev(deltaXRef.current);
    } else {
      // Not dragged far enough - snap back
      snapBack(deltaXRef.current);
    }
  };
  
  const handleClick = (e) => {
    // If we have a significant drag, don't treat as a click
    if (!carouselRef.current || Math.abs(deltaXRef.current) > 5) return;
    
    // Determine if clicked on left or right half of carousel
    const rightHalf = e.nativeEvent.offsetX / (carouselRef.current.clientWidth || 1) > 0.5;
    
    // Navigate accordingly
    if (rightHalf) {
      clearTimer();
      goNext(0);
    } else {
      clearTimer();
      goPrev(0);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      clearTimer();
      goPrev(0);
    } else if (e.key === "ArrowRight") {
      clearTimer();
      goNext(0);
    }
  };
  
  // Restart timer when images or currentIndex changes
  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [images, currentIndex, autoplaySpeed]);
  
  // Early return if no images
  if (!images || images.length === 0) {
    return null;
  }
  
  return (
    <div 
      ref={carouselRef}
      className={styles.carousel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      aria-label="Image carousel"
    >
      {images.map((image, i) => (
        <div 
          key={image._key || `slide-${i}`} 
          className={`${styles.slide} ${i === currentIndex ? styles.active : ''}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${images.length}`}
        >
          <Image
            src={image.url}
            alt={image.alt || 'Carousel image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
            priority={i === currentIndex}
            quality={90}
          />
        </div>
      ))}
      
      {/* Dot indicators for accessibility and visual reference */}
      {images.length > 1 && (
        <div className={styles.indicators} aria-hidden="true">
          {images.map((_, i) => (
            <button
              key={`indicator-${i}`}
              className={`${styles.indicator} ${i === currentIndex ? styles.active : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                clearTimer();
                setCurrentIndex(i);
                startTimer();
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}