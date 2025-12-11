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

  // ✅ Auto-open based on current route
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

  // Normalise worksGroups into a flat array
  const worksArray = Array.isArray(worksGroups)
    ? worksGroups
    : Object.values(worksGroups || {}).flat();

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

      {/* ✅ WORKS ON PAPER — FLAT, DEFENSIVE */}
      <div className={styles.section}>
        <button className={styles.topButton} onClick={() => toggle("works")}>
          Works on Paper
        </button>

        {open.works && (
          <div className={styles.list}>
            {worksArray.length === 0 && (
              <div className={styles.placeholder}>No works yet</div>
            )}

            {worksArray.map((group) => {
              // Try multiple shapes just in case
              const rawYear =
                group.year ?? group.groupYear ?? group.group?.year ?? null;

              const hasYear =
                typeof rawYear === "number" ||
                (typeof rawYear === "string" && rawYear.trim() !== "");
              const hasLocation = !!group.location;

              const year = hasYear ? rawYear : null;

              // Build a nice label
              const parts = [];
              if (group.title) parts.push(group.title);
              if (group.location) parts.push(group.location);
              if (year) parts.push(year);
              const label = parts.join(", ") || "Untitled group";
              const count = group.workCount ?? 0;

              // If we somehow still don't have both year + location, don't make a broken link
              if (!hasYear || !hasLocation) {
                return (
                  <div
                    key={group._id}
                    className={`${styles.itemButton} ${styles.disabled || ""}`}
                    title="This group is missing a year or location"
                  >
                    {label} ({count})
                  </div>
                );
              }

              const href = `/works-on-paper/${year}/${encodeURIComponent(
                group.location
              )}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={group._id}
                  href={href}
                  className={`${styles.itemButton} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  {label} ({count})
                </Link>
              );
            })}
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
