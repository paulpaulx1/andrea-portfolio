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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {group.year} — {decodedLocation}
        </h1>

        {group.groupDescription && group.groupDescription.length > 0 && (
          <div className={styles.description}>
            <PortableText value={group.groupDescription} />
          </div>
        )}

        <p className={styles.workCount}>
          {works.length} {works.length === 1 ? "work" : "works"}
        </p>
      </header>

      <div className={styles.masonry}>
        {works.map((work, index) => (
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
              <h3 className={styles.itemTitle}>{work.title}</h3>
              {work.dimensions && (
                <p className={styles.itemMeta}>{work.dimensions}</p>
              )}
              {work.medium && <p className={styles.itemMeta}>{work.medium}</p>}
            </div>
          </div>
        ))}
      </div>

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
