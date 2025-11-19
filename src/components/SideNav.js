"use client";

import Link from "next/link";
import { useNavigation } from "../app/context/NavigationProvider";
import styles from "./SideNavClient.module.css";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const router = useRouter();

  const { loaded, films, worksGroups, avocetArtists, open, toggle } =
    useNavigation();

  if (!loaded) {
    return <nav className={styles.nav}>loading…</nav>;
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
            router.push("/avocet-portfolio"); // ← navigate to landing page
            toggle("avocet"); // ← expand/collapse artists
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

      {/* Static */}
      <div className={styles.section}>
        <button className={styles.topButton}>Archive</button>
      </div>

      <div className={styles.section}>
        <button className={styles.topButton}>Information</button>
      </div>
    </nav>
  );
}
