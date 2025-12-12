// app/works-on-paper/[year]/[location]/WorksGridClient.jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Lightbox from "@components/Lightbox";
import styles from "./WorksGrid.module.css";

export default function WorksGridClient({ group, works, year, location }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const decodedLocation = decodeURIComponent(location);

  function normalizeTitle(t) {
    const s = (t || "").trim();
    if (!s) return "untitled";
    const lower = s.toLowerCase();
    if (lower === "untitled") return "untitled";
    return lower;
  }

  function toAlpha(n) {
    // 1 -> a, 2 -> b, ... 26 -> z, 27 -> aa ...
    let x = n;
    let out = "";
    while (x > 0) {
      x--;
      out = String.fromCharCode(97 + (x % 26)) + out;
      x = Math.floor(x / 26);
    }
    return out;
  }

  function buildSerialMap(works, serialization) {
    const enabled = serialization?.enabled;
    if (!enabled) return new Map();

    const mode = serialization?.mode || "alpha"; // "alpha" | "numeric"
    const scope = serialization?.scope || "duplicatesOnly"; // "duplicatesOnly" | "all"

    const keys = works.map((w) => normalizeTitle(w.title));

    const counts = new Map();
    keys.forEach((k) => counts.set(k, (counts.get(k) || 0) + 1));

    const shouldLabelIndex = (i) => {
      if (scope === "all") return true;
      const key = keys[i];
      return (counts.get(key) || 0) > 1;
    };

    const perKeyCounter = new Map();
    let globalCounter = 0;

    const map = new Map(); // work._id -> label

    works.forEach((w, i) => {
      if (!shouldLabelIndex(i)) return;

      if (scope === "all") {
        globalCounter += 1;
        map.set(
          w._id,
          mode === "numeric" ? String(globalCounter) : toAlpha(globalCounter)
        );
        return;
      }

      const key = keys[i];
      const next = (perKeyCounter.get(key) || 0) + 1;
      perKeyCounter.set(key, next);

      map.set(w._id, mode === "numeric" ? String(next) : toAlpha(next));
    });

    return map;
  }

  // Format images for the Lightbox component
  const images = works.map((work) => ({
    asset: {
      url: work.imageUrl,
      metadata: {
        lqip: work.lqip,
        dimensions: {
          width: work.width || 1200,
          height: work.height || 1600,
        },
      },
    },
  }));

  // Function to open the lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  const serialMap = buildSerialMap(works, group?.serialization);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {group.year} — {decodedLocation}
        </h1>

        <p className={styles.workCount}>
          {works.length} {works.length === 1 ? "work" : "works"}
        </p>
      </header>

      <div className={styles.masonry}>
        {works.map((work, index) => {
          const serial = serialMap.get(work._id); // "a" | "1" | undefined
          const displayTitle = serial
            ? `${work.title || "Untitled"} ${serial}`
            : work.title || "Untitled";

          return (
            <div
              key={work._id}
              onClick={() => openLightbox(index)}
              className={styles.masonryItem}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={work.imageUrl}
                  alt={work.alt || work.title}
                  width={work.width || 1200}
                  height={work.height || 1600}
                  className={styles.image}
                  placeholder={work.lqip ? "blur" : "empty"}
                  blurDataURL={work.lqip}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                />
              </div>

              <div className={styles.itemInfo}>
                <div className={styles.titleRow}>
                  <h3 className={styles.itemTitle}>
                    {work.title || "Untitled"}
                  </h3>

                  {serial && (
                    <span className={styles.serialInline}>{serial}</span>
                  )}
                </div>

                {work.dimensions && (
                  <p className={styles.itemMeta}>{work.dimensions}</p>
                )}
                {work.medium && (
                  <p className={styles.itemMeta}>{work.medium}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {group.groupDescription && group.groupDescription.length > 0 && (
        <div className={styles.description}>
          <PortableText value={group.groupDescription} />
        </div>
      )}

      {/* Lightbox for full-screen images */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
