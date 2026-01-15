"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Lightbox from "@components/Lightbox";
import styles from "./WorksGrid.module.css";

export default function WorksGridClient({ group, works }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Check if serialization is enabled
  const isSerialized = group?.serialization?.enabled === true;

  // Build serial labels if enabled
  const serialMap = useMemo(() => {
    if (!isSerialized) return new Map();

    const map = new Map();
    const mode = group.serialization.mode || "alpha";

    works.forEach((work, i) => {
      const label =
        mode === "numeric" ? String(i + 1) : String.fromCharCode(97 + i);
      map.set(work._id, label);
    });

    return map;
  }, [works, isSerialized, group?.serialization]);

  // Format images for lightbox with optimized URLs
  const images = useMemo(
    () =>
      works.map((work) => ({
        asset: {
          url: work.imageUrl, // Back to original
          metadata: {
            lqip: work.lqip,
            dimensions: {
              width: work.width || 1200,
              height: work.height || 1600,
            },
          },
        },
      })),
    [works]
  );

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="pageHeader">
          {group.title
            ? `${group.title} - ${group.location} - ${group.year}`
            : `${group.location} - ${group.year}`}
        </h1>
        <p className={styles.workCount}>
          {works.length} {works.length === 1 ? "work" : "works"}
        </p>
      </header>

      <div className={styles.masonry}>
        {works.map((work, i) => {
          const serial = serialMap.get(work._id);
          const isFirstInSeries = isSerialized && i === 0;
          const showTitle = !isSerialized || isFirstInSeries;

          return (
            <div
              key={work._id}
              onClick={() => openLightbox(i)}
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
                  {showTitle && (
                    <h3 className={styles.itemTitle}>
                      {work.title || "Untitled"}
                    </h3>
                  )}
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
