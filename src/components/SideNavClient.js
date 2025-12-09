// components/SideNavClient.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SideNavClient.module.css";

export default function SideNavClient({
  pathname,
  films,
  worksGroups,
  avocetArtists,
}) {
  const router = useRouter();

  const [open, setOpen] = useState({
    films: false,
    works: false,
    avocet: false,
  });

  // ✅ Auto-expand based on route
  useEffect(() => {
    setOpen({
      films: pathname.startsWith("/films"),
      works: pathname.startsWith("/works-on-paper"),
      avocet: pathname.startsWith("/avocet-portfolio"),
    });
  }, [pathname]);

  function toggle(section) {
    setOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <nav className={styles.nav}>
      {/* ABOUT */}
      <div className={styles.section}>
        <Link href="/" className={styles.topButton}>
          About
        </Link>
      </div>

      {/* FILMS */}
      <div className={styles.section}>
        <button className={styles.topButton} onClick={() => toggle("films")}>
          Films
        </button>

        {open.films && (
          <div className={styles.list}>
            {films.map((film) => (
              <Link
                key={film._id}
                href={`/films/${encodeURIComponent(film.title)}`}
                className={styles.itemButton}
              >
                {film.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* WORKS */}
      <div className={styles.section}>
        <button className={styles.topButton} onClick={() => toggle("works")}>
          Works on Paper
        </button>

        {open.works && (
          <div className={styles.list}>
            {Object.keys(worksGroups)
              .sort((a, b) => Number(b) - Number(a))
              .map((year) => (
                <div key={year}>
                  <div className={styles.itemButton}>{year}</div>

                  <div className={styles.nestedList}>
                    {worksGroups[year].map((loc) => (
                      <Link
                        key={loc._id}
                        href={`/works-on-paper/${year}/${encodeURIComponent(
                          loc.location
                        )}`}
                        className={`${styles.itemButton} ${styles.nested}`}
                      >
                        {loc.location} ({loc.workCount})
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* AVOCET */}
      <div className={styles.section}>
        <button
          className={styles.topButton}
          onClick={() => {
            router.push("/avocet-portfolio");
            toggle("avocet");
          }}
        >
          Avocet Portfolio
        </button>

        {open.avocet && (
          <div className={styles.list}>
            {avocetArtists.map((artist) => (
              <Link
                key={artist._id}
                href={`/avocet-portfolio/${artist.slug}`}
                className={styles.itemButton}
              >
                {artist.firstName} {artist.lastName}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* STATIC */}
      <div className={styles.section}>
        <div className={styles.topButton}>Archive</div>
      </div>

      <div className={styles.section}>
        <div className={styles.topButton}>Information</div>
      </div>
    </nav>
  );
}
