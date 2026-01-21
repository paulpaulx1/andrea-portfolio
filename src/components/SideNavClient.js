"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import styles from "./SideNavClient.module.css";

// Helper to create slug from group data
function createSlug(year, location, title) {
  const parts = [year, location];
  if (title) parts.push(title);
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeSlug(value) {
  // Accept either:
  // - "susan-spencer-crowe"
  // - { current: "susan-spencer-crowe" }
  // - null/undefined
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && typeof value.current === "string")
    return value.current;
  return "";
}

export default function SideNavClient({
  pathname,
  films = [],
  worksGroups,
  avocetArtists = [],
}) {
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
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  // Normalise worksGroups into a flat array
  const worksArray = useMemo(() => {
    return Array.isArray(worksGroups)
      ? worksGroups
      : Object.values(worksGroups || {}).flat();
  }, [worksGroups]);

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
            {films.map((film) => {
              // ✅ Prefer a real slug field (recommended).
              // Accept either film.slug (string) or film.slug.current (Sanity shape)
              const filmSlug = safeSlug(film.slug);

              // Fallback ONLY if you haven't added film.slug yet
              // (keeps your UI alive, but you should add slugs)
              const fallback = film.title ? encodeURIComponent(film.title) : "";
              const href = filmSlug
                ? `/films/${encodeURIComponent(filmSlug)}`
                : `/films/${fallback}`;

              const isActive = pathname === href;

              return (
                <Link
                  key={film._id}
                  href={href}
                  className={`${styles.itemButton} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  {film.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* WORKS ON PAPER */}
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
              const rawYear =
                group.year ?? group.groupYear ?? group.group?.year ?? null;

              const hasYear =
                typeof rawYear === "number" ||
                (typeof rawYear === "string" && rawYear.trim() !== "");
              const hasLocation = !!group.location;

              const year = hasYear ? rawYear : null;

              const parts = [];
              if (group.title) parts.push(group.title);
              if (group.location) parts.push(group.location);
              if (year) parts.push(year);
              const label = parts.join(", ") || "Untitled group";
              const count = group.workCount ?? 0;

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

              const slug = createSlug(year, group.location, group.title);
              const href = `/works-on-paper/${slug}`;
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
        <button className={styles.topButton} onClick={() => toggle("avocet")}>
          Avocet Portfolio
        </button>

        {open.avocet && (
          <div className={styles.list}>
            <Link
              href="/avocet-portfolio/about"
              className={`${styles.itemButton} ${
                pathname === "/avocet-portfolio/about" ? styles.active : ""
              }`}
            >
              About
            </Link>

            {avocetArtists.map((artist) => {
              const slug = safeSlug(artist.slug);
              const href = slug
                ? `/avocet-portfolio/${encodeURIComponent(slug)}`
                : "/avocet-portfolio/about";

              const isActive = pathname === href;

              return (
                <Link
                  key={artist._id}
                  href={href}
                  className={`${styles.itemButton} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  {artist.firstName} {artist.lastName}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* INFORMATION */}
      <div className={styles.section}>
        <Link href="/information" className={styles.topButton}>
          Information
        </Link>
      </div>
    </nav>
  );
}
