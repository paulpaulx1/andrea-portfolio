'use client';

// components/MobileNav.jsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './MobileNav.module.css';

export default function MobileNav({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.mobileNav}>
      <button 
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? (
          <X size={24} color="#777" />
        ) : (
          <Menu size={24} color="#777" />
        )}
      </button>
      
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        {children}
      </div>
    </div>
  );
}