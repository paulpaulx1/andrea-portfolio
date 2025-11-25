// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import styles from "./SideNavClient.module.css";

// export default function SideNavClient() {
//   const [filmsExpanded, setFilmsExpanded] = useState(false);
//   const [films, setFilms] = useState([]);
//   const [loadingFilms, setLoadingFilms] = useState(false);

//   const [worksExpanded, setWorksExpanded] = useState(false);
//   const [worksGroups, setWorksGroups] = useState({});
//   const [loadingWorks, setLoadingWorks] = useState(false);
//   const [expandedYears, setExpandedYears] = useState({});

//   const [avocetExpanded, setAvocetExpanded] = useState(false);
//   const [avocetArtists, setAvocetArtists] = useState([]);
//   const [loadingAvocet, setLoadingAvocet] = useState(false);
//   const [avocetManuallyClosed, setAvocetManuallyClosed] = useState(false);

//   const router = useRouter();
//   const pathname = usePathname();
//   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

//   // auto-expand when on /films/*
//   useEffect(() => {
//     if (pathname.startsWith("/films")) {
//       setFilmsExpanded(true);
//       if (films.length === 0) {
//         (async () => {
//           try {
//             setLoadingFilms(true);
//             const res = await fetch("/api/films", { cache: "force-cache" });
//             const data = await res.json();
//             setFilms(data.films || []);
//           } catch (err) {
//             console.error("Failed to fetch films:", err);
//           } finally {
//             setLoadingFilms(false);
//           }
//         })();
//       }
//     }
//   }, [pathname, films.length]);

//   // auto-expand when on /works-on-paper/*
//   useEffect(() => {
//     if (pathname.startsWith("/works-on-paper")) {
//       setWorksExpanded(true);
//       if (Object.keys(worksGroups).length === 0) {
//         (async () => {
//           try {
//             setLoadingWorks(true);
//             const res = await fetch("/api/works-on-paper/groups", {
//               cache: "force-cache",
//             });
//             const data = await res.json();
//             setWorksGroups(data.byYear || {});

//             const match = pathname.match(/^\/works-on-paper\/(\d+)/);
//             if (match) {
//               const year = match[1];
//               setExpandedYears((prev) => ({ ...prev, [year]: true }));
//             }
//           } catch (err) {
//             console.error("Failed to fetch works groups:", err);
//           } finally {
//             setLoadingWorks(false);
//           }
//         })();
//       } else {
//         const match = pathname.match(/^\/works-on-paper\/(\d+)/);
//         if (match) {
//           const year = match[1];
//           setExpandedYears((prev) => ({ ...prev, [year]: true }));
//         }
//       }
//     }
//   }, [pathname]);

//   // auto-expand when on /avocet-portfolio/*
//   useEffect(() => {
//     const inAvocet = pathname.startsWith("/avocet-portfolio");

//     if (inAvocet) {
//       if (!avocetExpanded && !avocetManuallyClosed) {
//         setAvocetExpanded(true);
//       }

//       if (avocetArtists.length === 0 && !loadingAvocet) {
//         setLoadingAvocet(true);
//         fetch("/api/avocet-portfolio/artists", { cache: "force-cache" })
//           .then((res) => res.json())
//           .then((data) => setAvocetArtists(data.artists || []))
//           .finally(() => setLoadingAvocet(false));
//       }
//     } else {
//       // Reset this ONLY when leaving the entire Avocet section
//       setAvocetManuallyClosed(false);
//     }
//   }, [pathname]); // <-- ONLY pathname!

//   // Track mobile state for responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       if (
//         (window.innerWidth < 768 && !isMobile) ||
//         (window.innerWidth >= 768 && isMobile)
//       ) {
//         setFilmsExpanded((prev) =>
//           pathname.startsWith("/films") ? true : prev
//         );
//         setWorksExpanded((prev) =>
//           pathname.startsWith("/works-on-paper") ? true : prev
//         );
//         setAvocetExpanded((prev) =>
//           pathname.startsWith("/avocet-portfolio") ? true : prev
//         );
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isMobile, pathname]);

//   const toggleFilms = async () => {
//     if (filmsExpanded) {
//       setFilmsExpanded(false);
//       return;
//     }
//     setFilmsExpanded(true);
//     if (films.length === 0) {
//       setLoadingFilms(true);
//       const res = await fetch("/api/films", { cache: "force-cache" });
//       const data = await res.json();
//       setFilms(data.films || []);
//       setLoadingFilms(false);
//     }
//   };

//   const toggleWorks = async () => {
//     if (worksExpanded) {
//       setWorksExpanded(false);
//       setExpandedYears({});
//       return;
//     }
//     setWorksExpanded(true);
//     if (Object.keys(worksGroups).length === 0) {
//       setLoadingWorks(true);
//       const res = await fetch("/api/works-on-paper/groups", {
//         cache: "force-cache",
//       });
//       const data = await res.json();
//       setWorksGroups(data.byYear || {});
//       setLoadingWorks(false);
//     }
//   };

//   const toggleAvocet = async () => {
//     if (avocetExpanded) {
//       setAvocetExpanded(false);
//       setAvocetManuallyClosed(true); // Mark as manually closed
//       return;
//     }
//     setAvocetExpanded(true);
//     setAvocetManuallyClosed(false); // Reset the flag
//     if (avocetArtists.length === 0) {
//       setLoadingAvocet(true);
//       const res = await fetch("/api/avocet-portfolio/artists", {
//         cache: "force-cache",
//       });
//       const data = await res.json();
//       setAvocetArtists(data.artists || []);
//       setLoadingAvocet(false);
//     }
//   };

//   const toggleYear = (year) => {
//     setExpandedYears((prev) => ({
//       ...prev,
//       [year]: !prev[year],
//     }));
//   };

//   const handleNavigation = (path) => {
//     router.push(path);
//   };

//   const sortedYears = Object.keys(worksGroups).sort(
//     (a, b) => parseInt(b) - parseInt(a)
//   );

//   return (
//     <nav className={styles.nav}>
//       <div className={styles.section}>
//         <button
//           className={`${styles.topButton} ${pathname === "/" ? styles.active : ""}`}
//           onClick={() => handleNavigation("/")}
//         >
//           About
//         </button>
//       </div>

//       <div className={styles.section}>
//         <button className={styles.topButton} onClick={toggleFilms}>
//           Films
//         </button>

//         {filmsExpanded && (
//           <div className={styles.list}>
//             {loadingFilms && <div className={styles.placeholder}>Loading…</div>}
//             {!loadingFilms && films.length === 0 && (
//               <div className={styles.placeholder}>No films yet</div>
//             )}
//             {films.map((film) => {
//               const isActive =
//                 pathname === `/films/${encodeURIComponent(film.title)}`;
//               return (
//                 <button
//                   key={film._id}
//                   onClick={() =>
//                     handleNavigation(`/films/${encodeURIComponent(film.title)}`)
//                   }
//                   className={`${styles.itemButton} ${
//                     isActive ? styles.active : ""
//                   }`}
//                 >
//                   {film.title}
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <div className={styles.section}>
//         <button className={styles.topButton} onClick={toggleWorks}>
//           Works on Paper
//         </button>

//         {worksExpanded && (
//           <div className={styles.list}>
//             {loadingWorks && <div className={styles.placeholder}>Loading…</div>}
//             {!loadingWorks && sortedYears.length === 0 && (
//               <div className={styles.placeholder}>No works yet</div>
//             )}
//             {sortedYears.map((year) => {
//               const locations = worksGroups[year];
//               const isYearExpanded = expandedYears[year];

//               return (
//                 <div key={year}>
//                   <button
//                     onClick={() => toggleYear(year)}
//                     className={styles.itemButton}
//                   >
//                     {year}
//                   </button>

//                   {isYearExpanded && (
//                     <div className={styles.nestedList}>
//                       {locations.map((loc) => {
//                         const isActive =
//                           pathname ===
//                           `/works-on-paper/${year}/${encodeURIComponent(loc.location)}`;
//                         return (
//                           <button
//                             key={loc._id}
//                             onClick={() =>
//                               handleNavigation(
//                                 `/works-on-paper/${year}/${encodeURIComponent(loc.location)}`
//                               )
//                             }
//                             className={`${styles.itemButton} ${styles.nested} ${isActive ? styles.active : ""}`}
//                           >
//                             {loc.location} ({loc.workCount})
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <div className={styles.section}>
//         <button className={styles.topButton} onClick={toggleAvocet}>
//           Avocet Portfolio
//         </button>

//         {avocetExpanded && (
//           <div className={styles.list}>
//             {loadingAvocet && (
//               <div className={styles.placeholder}>Loading…</div>
//             )}
//             {!loadingAvocet && avocetArtists.length === 0 && (
//               <div className={styles.placeholder}>No artists yet</div>
//             )}
//             {avocetArtists.map((artist) => {
//               const isActive = pathname === `/avocet-portfolio/${artist.slug}`;
//               return (
//                 <button
//                   key={artist._id}
//                   onClick={() =>
//                     handleNavigation(`/avocet-portfolio/${artist.slug}`)
//                   }
//                   className={`${styles.itemButton} ${
//                     isActive ? styles.active : ""
//                   }`}
//                 >
//                   {artist.firstName} {artist.lastName}
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <div className={styles.section}>
//         <button
//           className={styles.topButton}
//           onClick={() => alert("Archive coming soon!")}
//         >
//           Archive
//         </button>
//       </div>
//       <div className={styles.section}>
//         <button
//           className={styles.topButton}
//           onClick={() => alert("Information coming soon!")}
//         >
//           Information
//         </button>
//       </div>
//     </nav>
//   );
// }

// app/components/SideNav.jsx

import Link from "next/link";

// -------------------------------------------------------
// SERVER FETCH HELPERS (replace with real GROQ/db queries)
// -------------------------------------------------------

async function fetchFilms() {
  // Replace with GROQ or DB call
  return [];
}

async function fetchWorksGroups() {
  // Replace with GROQ or DB call
  return {}; // {year: [{ location, workCount, _id }]}
}

async function fetchAvocetArtists() {
  // Replace with GROQ or DB call
  return [];
}

// -------------------------------------------------------
// FILMS SECTION
// -------------------------------------------------------

async function FilmsSection({ pathname }) {
  const isActiveSection = pathname.startsWith("/films");
  const films = isActiveSection ? await fetchFilms() : [];

  return (
    <div className="section">
      <div className="topButton">Films</div>

      {isActiveSection && (
        <div className="list">
          {films.length === 0 && (
            <div className="placeholder">No films yet</div>
          )}

          {films.map((film) => {
            const url = `/films/${encodeURIComponent(film.title)}`;
            const active = pathname === url;
            return (
              <Link
                key={film._id}
                href={url}
                className={`itemButton ${active ? "active" : ""}`}
              >
                {film.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------
// WORKS ON PAPER SECTION
// -------------------------------------------------------

async function WorksSection({ pathname }) {
  const isActiveSection = pathname.startsWith("/works-on-paper");

  const groups = isActiveSection ? await fetchWorksGroups() : {};

  let activeYear = null;
  let activeLocation = null;

  if (isActiveSection) {
    const match = pathname.match(/^\/works-on-paper\/(\d+)(?:\/(.+))?/);
    if (match) {
      activeYear = match[1];
      activeLocation = match[2] || null;
    }
  }

  return (
    <div className="section">
      <div className="topButton">Works on Paper</div>

      {isActiveSection && (
        <div className="list">
          {Object.keys(groups).length === 0 && (
            <div className="placeholder">No works yet</div>
          )}

          {Object.keys(groups)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((year) => {
              const locations = groups[year];
              const open = year === activeYear;

              return (
                <div key={year}>
                  <div className="itemButton">{year}</div>

                  {open && (
                    <div className="nestedList">
                      {locations.map((loc) => {
                        const url = `/works-on-paper/${year}/${encodeURIComponent(
                          loc.location
                        )}`;
                        const active = pathname === url;

                        return (
                          <Link
                            key={loc._id}
                            href={url}
                            className={`itemButton nested ${
                              active ? "active" : ""
                            }`}
                          >
                            {loc.location} ({loc.workCount})
                          </Link>
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
  );
}

// -------------------------------------------------------
// AVOCET SECTION (PROBLEM CHILD — FIXED PERMANENTLY)
// -------------------------------------------------------

async function AvocetSection({ pathname }) {
  const isActiveSection = pathname.startsWith("/avocet-portfolio");

  // Only fetch artists ONCE per server render.
  // No refetching as user clicks internal links,
  // because each click triggers a NEW server render.
  const artists = isActiveSection ? await fetchAvocetArtists() : [];

  return (
    <div className="section">
      <div className="topButton">Avocet Portfolio</div>

      {isActiveSection && (
        <div className="list">
          {artists.length === 0 && (
            <div className="placeholder">No artists yet</div>
          )}

          {artists.map((artist) => {
            const url = `/avocet-portfolio/${artist.slug}`;
            const active = pathname === url;

            return (
              <Link
                key={artist._id}
                href={url}
                className={`itemButton ${active ? "active" : ""}`}
              >
                {artist.firstName} {artist.lastName}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------
// ROOT SERVER COMPONENT
// -------------------------------------------------------

export default async function SideNav({ pathname }) {
  return (
    <nav className="side-nav">
      {/* ABOUT */}
      <div className="section">
        <Link
          href="/"
          className={`topButton ${pathname === "/" ? "active" : ""}`}
        >
          About
        </Link>
      </div>

      {/* The three dynamic sections */}
      {await FilmsSection({ pathname })}
      {await WorksSection({ pathname })}
      {await AvocetSection({ pathname })}

      {/* Static items */}
      <div className="section">
        <div className="topButton">Archive</div>
      </div>

      <div className="section">
        <div className="topButton">Information</div>
      </div>
    </nav>
  );
}

