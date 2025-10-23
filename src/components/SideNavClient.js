'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './SideNavClient.module.css';

export default function SideNavClient() {
  const [filmsExpanded, setFilmsExpanded] = useState(false);
  const [films, setFilms] = useState([]);
  const [loadingFilms, setLoadingFilms] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // auto-expand when on /films/*
  useEffect(() => {
    if (pathname.startsWith('/films')) {
      setFilmsExpanded(true);
      if (films.length === 0) {
        (async () => {
          try {
            setLoadingFilms(true);
            const res = await fetch('/api/films', { cache: 'force-cache' });
            const data = await res.json();
            setFilms(data.films || []);
          } catch (err) {
            console.error('Failed to fetch films:', err);
          } finally {
            setLoadingFilms(false);
          }
        })();
      }
    }
  }, [pathname, films.length]);

  // Track mobile state for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // This will cause a re-render when crossing the mobile breakpoint
      if ((window.innerWidth < 768 && !isMobile) || 
          (window.innerWidth >= 768 && isMobile)) {
        // Force re-render by updating a state
        setFilmsExpanded(prev => pathname.startsWith('/films') ? true : prev);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, pathname]);

  const toggleFilms = async () => {
    if (filmsExpanded) {
      setFilmsExpanded(false);
      return;
    }
    setFilmsExpanded(true);
    if (films.length === 0) {
      setLoadingFilms(true);
      const res = await fetch('/api/films', { cache: 'force-cache' });
      const data = await res.json();
      setFilms(data.films || []);
      setLoadingFilms(false);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    // If on mobile, possibly close the menu after navigation
    // This would be handled by the parent MobileNav component
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.section}>
        <button 
          className={`${styles.topButton} ${pathname === '/' ? styles.active : ''}`} 
          onClick={() => handleNavigation('/')}
        >
          About
        </button>
      </div>

      <div className={styles.section}>
        <button className={styles.topButton} onClick={toggleFilms}>
          Films
        </button>

        {filmsExpanded && (
          <div className={styles.list}>
            {loadingFilms && (
              <div className={styles.placeholder}>Loading…</div>
            )}
            {!loadingFilms && films.length === 0 && (
              <div className={styles.placeholder}>No films yet</div>
            )}
            {films.map((film) => {
              const isActive =
                pathname === `/films/${encodeURIComponent(film.title)}`;
              return (
                <button
                  key={film._id}
                  onClick={() =>
                    handleNavigation(`/films/${encodeURIComponent(film.title)}`)
                  }
                  className={`${styles.itemButton} ${
                    isActive ? styles.active : ''
                  }`}
                >
                  {film.title}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <button
          className={styles.topButton}
          onClick={() => alert('Avocet Portfolio coming soon!')}
        >
          Avocet Portfolio
        </button>
      </div>
      <div className={styles.section}>
        <button
          className={styles.topButton}
          onClick={() => alert('Archive coming soon!')}
        >
          Archive
        </button>
      </div>
      <div className={styles.section}>
        <button
          className={styles.topButton}
          onClick={() => alert('Information coming soon!')}
        >
          Information
        </button>
      </div>
    </nav>
  );
}