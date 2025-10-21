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
  }, [pathname]);

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

  return (
    <nav className={styles.nav}>
      <div className={styles.section}>
        <button className={styles.topButton} onClick={() => router.push('/')}>
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
                    router.push(`/films/${encodeURIComponent(film.title)}`)
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
    </nav>
  );
}
