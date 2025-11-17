"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./SideNavClient.module.css";

export default function SideNavClient() {
  const [filmsExpanded, setFilmsExpanded] = useState(false);
  const [films, setFilms] = useState([]);
  const [loadingFilms, setLoadingFilms] = useState(false);

  const [worksExpanded, setWorksExpanded] = useState(false);
  const [worksGroups, setWorksGroups] = useState({});
  const [loadingWorks, setLoadingWorks] = useState(false);
  const [expandedYears, setExpandedYears] = useState({});

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // auto-expand when on /films/*
  useEffect(() => {
    if (pathname.startsWith("/films")) {
      setFilmsExpanded(true);
      if (films.length === 0) {
        (async () => {
          try {
            setLoadingFilms(true);
            const res = await fetch("/api/films", { cache: "force-cache" });
            const data = await res.json();
            setFilms(data.films || []);
          } catch (err) {
            console.error("Failed to fetch films:", err);
          } finally {
            setLoadingFilms(false);
          }
        })();
      }
    }
  }, [pathname, films.length]);

  // auto-expand when on /works-on-paper/*
  useEffect(() => {
    if (pathname.startsWith("/works-on-paper")) {
      setWorksExpanded(true);
      if (Object.keys(worksGroups).length === 0) {
        (async () => {
          try {
            setLoadingWorks(true);
            const res = await fetch("/api/works-on-paper/groups", {
              cache: "force-cache",
            });
            const data = await res.json();
            setWorksGroups(data.byYear || {});

            // Auto-expand the year if we're on a specific portfolio page
            const match = pathname.match(/^\/works-on-paper\/(\d+)/);
            if (match) {
              const year = match[1];
              setExpandedYears((prev) => ({ ...prev, [year]: true }));
            }
          } catch (err) {
            console.error("Failed to fetch works groups:", err);
          } finally {
            setLoadingWorks(false);
          }
        })();
      } else {
        // If groups are already loaded, just expand the relevant year
        const match = pathname.match(/^\/works-on-paper\/(\d+)/);
        if (match) {
          const year = match[1];
          setExpandedYears((prev) => ({ ...prev, [year]: true }));
        }
      }
    }
  }, [pathname]);

  // Track mobile state for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (
        (window.innerWidth < 768 && !isMobile) ||
        (window.innerWidth >= 768 && isMobile)
      ) {
        setFilmsExpanded((prev) =>
          pathname.startsWith("/films") ? true : prev
        );
        setWorksExpanded((prev) =>
          pathname.startsWith("/works-on-paper") ? true : prev
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, pathname]);

  const toggleFilms = async () => {
    if (filmsExpanded) {
      setFilmsExpanded(false);
      return;
    }
    setFilmsExpanded(true);
    if (films.length === 0) {
      setLoadingFilms(true);
      const res = await fetch("/api/films", { cache: "force-cache" });
      const data = await res.json();
      setFilms(data.films || []);
      setLoadingFilms(false);
    }
  };

  const toggleWorks = async () => {
    if (worksExpanded) {
      setWorksExpanded(false);
      setExpandedYears({}); // Collapse all years when closing
      return;
    }
    setWorksExpanded(true);
    if (Object.keys(worksGroups).length === 0) {
      setLoadingWorks(true);
      const res = await fetch("/api/works-on-paper/groups", {
        cache: "force-cache",
      });
      const data = await res.json();
      setWorksGroups(data.byYear || {});
      setLoadingWorks(false);
    }
  };

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  // Sort years in descending order
  const sortedYears = Object.keys(worksGroups).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.section}>
        <button
          className={`${styles.topButton} ${pathname === "/" ? styles.active : ""}`}
          onClick={() => handleNavigation("/")}
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
            {loadingFilms && <div className={styles.placeholder}>Loading…</div>}
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
                    isActive ? styles.active : ""
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
        <button className={styles.topButton} onClick={toggleWorks}>
          Works on Paper
        </button>

        {worksExpanded && (
          <div className={styles.list}>
            {loadingWorks && <div className={styles.placeholder}>Loading…</div>}
            {!loadingWorks && sortedYears.length === 0 && (
              <div className={styles.placeholder}>No works yet</div>
            )}
            {sortedYears.map((year) => {
              const locations = worksGroups[year];
              const isYearExpanded = expandedYears[year];

              return (
                <div key={year}>
                  <button
                    onClick={() => toggleYear(year)}
                    className={styles.itemButton}
                  >
                    {year}
                  </button>

                  {isYearExpanded && (
                    <div className={styles.nestedList}>
                      {locations.map((loc) => {
                        const isActive =
                          pathname ===
                          `/works-on-paper/${year}/${encodeURIComponent(loc.location)}`;
                        return (
                          <button
                            key={loc._id}
                            onClick={() =>
                              handleNavigation(
                                `/works-on-paper/${year}/${encodeURIComponent(loc.location)}`
                              )
                            }
                            className={`${styles.itemButton} ${styles.nested} ${isActive ? styles.active : ""}`}
                          >
                            {loc.location} ({loc.workCount})
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <button
          className={styles.topButton}
          onClick={() => alert("Avocet Portfolio coming soon!")}
        >
          Avocet Portfolio
        </button>
      </div>
      <div className={styles.section}>
        <button
          className={styles.topButton}
          onClick={() => alert("Archive coming soon!")}
        >
          Archive
        </button>
      </div>
      <div className={styles.section}>
        <button
          className={styles.topButton}
          onClick={() => alert("Information coming soon!")}
        >
          Information
        </button>
      </div>
    </nav>
  );
}
