// src/components/SideNav.js
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getFilms } from '@/lib/sanity';

export default function SideNav() {
  const [films, setFilms] = useState([]);
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [filmsExpanded, setFilmsExpanded] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    async function loadFilms() {
      const filmData = await getFilms();
      setFilms(filmData);
    }
    
    loadFilms();
  }, []);

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
    // Dispatch a custom event to notify the page about the film selection
    window.dispatchEvent(new CustomEvent('filmSelected', { 
      detail: film 
    }));
  };
  
  return (
    <nav className="w-full md:w-64 bg-gray-100 border-r p-4">
      <div className="space-y-4">
        {/* About Section */}
        <div>
          <button 
            className="flex items-center text-gray-800 hover:text-black w-full text-left font-medium"
            onClick={() => setAboutExpanded(!aboutExpanded)}
          >
            <span className="mr-2">{aboutExpanded ? '▼' : '►'}</span>
            About
          </button>
          
          {aboutExpanded && (
            <div className="mt-2 ml-4 space-y-1">
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('showAbout', {}));
                  setSelectedFilm(null);
                }}
                className={`block py-1 px-2 text-sm rounded text-left w-full ${!selectedFilm ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Andrea Callard
              </button>
            </div>
          )}
        </div>
        
        {/* Films Section */}
        <div>
          <button 
            className="flex items-center text-gray-800 hover:text-black w-full text-left font-medium"
            onClick={() => setFilmsExpanded(!filmsExpanded)}
          >
            <span className="mr-2">{filmsExpanded ? '▼' : '►'}</span>
            Films
          </button>
          
          {filmsExpanded && (
            <div className="mt-2 ml-4 space-y-1">
              {films.map(film => (
                <button 
                  key={film._id}
                  onClick={() => handleFilmClick(film)}
                  className={`block py-1 px-2 text-sm rounded text-left w-full ${selectedFilm && selectedFilm._id === film._id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {film.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}