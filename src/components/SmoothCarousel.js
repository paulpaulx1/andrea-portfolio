'use client';

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
  const isAnimatingRef = useRef(false);

  const SPEED_SLIDE_MS = 600;
  const SPEED_SNAP_MS = 300;

  // --- Setup and teardown ---
  useEffect(() => {
    if (!carouselRef.current || !images?.length) return;
    slidesRef.current = Array.from(
      carouselRef.current.querySelectorAll(`.${styles.slide}`)
    );
    setupSlidePositions();
    startTimer();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimer();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [images]);

  // --- Utilities ---
  const startTimer = () => {
    clearTimer();
    if (autoplaySpeed > 0 && images?.length > 1) {
      timerRef.current = setTimeout(() => goNext(), autoplaySpeed);
    }
  };
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const setupSlidePositions = () => {
    slidesRef.current?.forEach((slide, i) => {
      if (i === currentIndex) slide.classList.add(styles.active);
      else resetSlideToRight(slide);
    });
  };

  const resetSlideToRight = (slide) => {
    if (!slide) return;
    slide.classList.remove(styles.active, styles.leaving);
    slide.style.transition = 'none';
    slide.style.transform = 'translateX(112%) scale(1.05)';
    void slide.offsetHeight;
    slide.style.transition = '';
  };
  const resetSlideToLeft = (slide) => {
    if (!slide) return;
    slide.classList.remove(styles.active, styles.leaving);
    slide.style.transition = 'none';
    slide.style.transform = 'translateX(-112%) scale(1.05)';
    void slide.offsetHeight;
    slide.style.transition = '';
  };

  // --- Cancel animation mid-transition ---
  const cancelTransition = () => {
    const slides = slidesRef.current;
    slides?.forEach((s) => {
      const st = window.getComputedStyle(s);
      const matrix = new DOMMatrixReadOnly(st.transform);
      s.style.transition = 'none';
      s.style.transform = `translateX(${matrix.m41}px) scale(1.05)`;
    });
    isAnimatingRef.current = false;
  };

  // --- Navigation ---
  const goNext = (startDelta = 0) => {
    if (isAnimatingRef.current || images.length <= 1) return;
    isAnimatingRef.current = true;
    clearTimer();

    const width = carouselRef.current.clientWidth || 1;
    const slides = slidesRef.current;
    const current = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const incoming = slides[nextIndex];

    current.classList.remove(styles.active);
    incoming.classList.remove(styles.active);

    const start = Math.max(-width, Math.min(0, startDelta));
    current.style.transition = 'none';
    incoming.style.transition = 'none';
    current.style.transform = `translateX(${start}px) scale(1.05)`;
    incoming.style.transform = `translateX(${width + start}px) scale(1.05)`;
    void current.offsetHeight;

    requestAnimationFrame(() => {
      const frac = Math.max(0.15, Math.min(1, (width - Math.abs(start)) / width));
      const dur = Math.round(SPEED_SLIDE_MS * frac);
      current.style.transition = `transform ${dur}ms ease`;
      incoming.style.transition = `transform ${dur}ms ease`;
      current.style.transform = `translateX(${-width}px) scale(1.05)`;
      incoming.style.transform = `translateX(0) scale(1.05)`;

      const onEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        current.removeEventListener('transitionend', onEnd);
        current.style.transition = '';
        incoming.style.transition = '';
        resetSlideToRight(current);
        incoming.classList.add(styles.active);
        setCurrentIndex(nextIndex);
        isAnimatingRef.current = false;
        startTimer();
      };
      current.addEventListener('transitionend', onEnd);
    });
  };

  const goPrev = (startDelta = 0) => {
    if (isAnimatingRef.current || images.length <= 1) return;
    isAnimatingRef.current = true;
    clearTimer();

    const width = carouselRef.current.clientWidth || 1;
    const slides = slidesRef.current;
    const current = slides[currentIndex];
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const incoming = slides[prevIndex];

    current.classList.remove(styles.active);
    incoming.classList.remove(styles.active);

    const start = Math.max(0, Math.min(width, startDelta));
    current.style.transition = 'none';
    incoming.style.transition = 'none';
    current.style.transform = `translateX(${start}px) scale(1.05)`;
    incoming.style.transform = `translateX(${-width + start}px) scale(1.05)`;
    void current.offsetHeight;

    requestAnimationFrame(() => {
      const frac = Math.max(0.15, Math.min(1, (width - Math.abs(start)) / width));
      const dur = Math.round(SPEED_SLIDE_MS * frac);
      current.style.transition = `transform ${dur}ms ease`;
      incoming.style.transition = `transform ${dur}ms ease`;
      current.style.transform = `translateX(${width}px) scale(1.05)`;
      incoming.style.transform = `translateX(0) scale(1.05)`;

      const onEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        current.removeEventListener('transitionend', onEnd);
        current.style.transition = '';
        incoming.style.transition = '';
        resetSlideToRight(current);
        incoming.classList.add(styles.active);
        setCurrentIndex(prevIndex);
        isAnimatingRef.current = false;
        startTimer();
      };
      current.addEventListener('transitionend', onEnd);
    });
  };

  const snapBack = (fromDelta) => {
    if (isAnimatingRef.current || images.length <= 1) return;
    isAnimatingRef.current = true;

    const width = carouselRef.current.clientWidth || 1;
    const slides = slidesRef.current;
    const current = slides[currentIndex];
    const next = slides[(currentIndex + 1) % images.length];
    const prev = slides[(currentIndex - 1 + images.length) % images.length];

    const frac = Math.max(0.1, Math.min(1, Math.abs(fromDelta) / width));
    const dur = Math.round(SPEED_SNAP_MS * frac);

    [current, next, prev].forEach(
      (s) => (s.style.transition = `transform ${dur}ms ease`)
    );

    current.style.transform = `translateX(0) scale(1.05)`;
    next.style.transform = `translateX(${width}px) scale(1.05)`;
    prev.style.transform = `translateX(${-width}px) scale(1.05)`;

    const onEnd = (e) => {
      if (e.propertyName !== 'transform') return;
      current.removeEventListener('transitionend', onEnd);
      resetSlideToRight(next);
      resetSlideToLeft(prev);
      current.classList.add(styles.active);
      isAnimatingRef.current = false;
      startTimer();
    };
    current.addEventListener('transitionend', onEnd);
  };

  // --- Pointer Events ---
  const handlePointerDown = (e) => {
    if (!carouselRef.current || images.length <= 1) return;

    // cancel any running animation before dragging
    cancelTransition();

    activePointerRef.current = e.pointerId;
    carouselRef.current.setPointerCapture(e.pointerId);
    clearTimer();
    isDownRef.current = true;
    deltaXRef.current = 0;
    startXRef.current = e.clientX;
    widthRef.current = carouselRef.current.clientWidth || 1;
    carouselRef.current.classList.add(styles.dragging);

    const slides = slidesRef.current;
    const width = widthRef.current;
    const next = slides[(currentIndex + 1) % images.length];
    const prev = slides[(currentIndex - 1 + images.length) % images.length];
    resetSlideToRight(next);
    resetSlideToLeft(prev);

    slides[currentIndex].style.transition =
      slides[next].style.transition =
      slides[prev].style.transition =
        'none';
    slides[next].style.transform = `translateX(${width}px) scale(1.05)`;
    slides[prev].style.transform = `translateX(${-width}px) scale(1.05)`;
    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!isDownRef.current || activePointerRef.current !== e.pointerId) return;
    deltaXRef.current = e.clientX - startXRef.current;

    const slides = slidesRef.current;
    const width = widthRef.current;
    const next = slides[(currentIndex + 1) % images.length];
    const prev = slides[(currentIndex - 1 + images.length) % images.length];
    slides[currentIndex].style.transform = `translateX(${deltaXRef.current}px) scale(1.05)`;
    next.style.transform = `translateX(${width + deltaXRef.current}px) scale(1.05)`;
    prev.style.transform = `translateX(${-width + deltaXRef.current}px) scale(1.05)`;
  };

  const handlePointerUp = (e) => {
    if (!isDownRef.current || activePointerRef.current !== e.pointerId) return;

    isDownRef.current = false;
    carouselRef.current.classList.remove(styles.dragging);
    try {
      carouselRef.current.releasePointerCapture(e.pointerId);
    } catch {}
    activePointerRef.current = null;

    const width = widthRef.current || carouselRef.current.clientWidth || 1;
    const abs = Math.abs(deltaXRef.current);

    if (abs <= 5) {
      const rect = carouselRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const rightHalf = x > rect.width / 2;
      clearTimer();
      rightHalf ? goNext(0) : goPrev(0);
      return;
    }

    const threshold = Math.min(80, width * 0.12);
    if (deltaXRef.current < -threshold) goNext(deltaXRef.current);
    else if (deltaXRef.current > threshold) goPrev(deltaXRef.current);
    else snapBack(deltaXRef.current);
  };

  // --- Keyboard ---
  const handleKeyDown = (e) => {
    if (isAnimatingRef.current) return;
    if (e.key === 'ArrowLeft') {
      clearTimer();
      goPrev(0);
    } else if (e.key === 'ArrowRight') {
      clearTimer();
      goNext(0);
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [images, currentIndex, autoplaySpeed]);

  if (!images?.length) return null;

  return (
    <div
      ref={carouselRef}
      className={styles.carousel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Image carousel"
    >
      {images.map((img, i) => (
        <div
          key={img._key || `slide-${i}`}
          className={`${styles.slide} ${i === currentIndex ? styles.active : ''}`}
        >
          <Image
            src={img.url}
            alt={img.alt || 'Carousel image'}
            fill
            quality={90}
            priority={i === currentIndex}
            sizes="(max-width:768px)100vw,(max-width:1200px)800px,800px"
          />
        </div>
      ))}

      {images.length > 1 && (
        <div className={styles.indicators}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.indicator} ${i === currentIndex ? styles.active : ''}`}
              onClick={(e) => {
                if (isAnimatingRef.current) return;
                e.stopPropagation();
                clearTimer();
                setCurrentIndex(i);
                startTimer();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
