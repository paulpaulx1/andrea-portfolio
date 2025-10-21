// src/components/MainContent.js
'use client';

import { useState, useEffect } from 'react';
import About from './About';
import FilmCard from './FilmCard';

export default function MainContent() {
  const [currentFilm, setCurrentFilm] = useState(null);
  const [showAbout, setShowAbout] = useState(true);

  useEffect(() => {
    // Listen for the film selection event
    const handleFilmSelected = (event) => {
      setCurrentFilm(event.detail);
      setShowAbout(false);
    };
    
    // Listen for the show about event
    const handleShowAbout = () => {
      setShowAbout(true);
    };
    
    window.addEventListener('filmSelected', handleFilmSelected);
    window.addEventListener('showAbout', handleShowAbout);
    
    // Clean up the event listeners
    return () => {
      window.removeEventListener('filmSelected', handleFilmSelected);
      window.removeEventListener('showAbout', handleShowAbout);
    };
  }, []);

  return (
    <div>
      {showAbout ? (
        <About />
      ) : (
        <FilmCard film={currentFilm} />
      )}
    </div>
  );
}