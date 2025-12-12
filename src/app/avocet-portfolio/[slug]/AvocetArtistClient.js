"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Lightbox from "@components/Lightbox";
import styles from "./AvocetArtist.module.css";

export default function AvocetArtistClient({ artist, artworks }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  // Lightbox expects Sanity-ish shape (like your Works on Paper)
  const images = useMemo(
    () =>
      (artworks || []).map((work) => ({
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
      })),
    [artworks]
  );

  const hero = artworks?.[0];
  const rest = artworks?.slice(1) || [];

  return (
    <div className={styles.container}>
      <h1 className="pageHeader" style={{ textAlign: "center" }}>
        {artist.firstName} {artist.lastName}
      </h1>

      {/* HERO */}
      {hero && (
        <div className={styles.heroSection}>
          <div
            className={styles.heroImage}
            role="button"
            tabIndex={0}
            onClick={() => openLightbox(0)}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(0)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={hero.imageUrl}
              alt={hero.imageAlt || hero.title || "Artwork"}
              width={hero.width || 800}
              height={hero.height || 1000}
              className={styles.image}
              priority
              placeholder={hero.lqip ? "blur" : "empty"}
              blurDataURL={hero.lqip}
            />
          </div>

          <div className={styles.metaBlock}>
            <h2 className={styles.title}>{hero.title || "Untitled"}</h2>

            <div className={styles.primaryMeta}>
              {hero.year && <span>{hero.year}</span>}
              {hero.medium && <span>{hero.medium}</span>}
              {hero.editionSize && <span>Edition of {hero.editionSize}</span>}
            </div>

            <div className={styles.secondaryMeta}>
              {hero.printDetails && <span>{hero.printDetails}</span>}
              {hero.dimensions && <span>{hero.dimensions}</span>}
            </div>

            {hero.description && (
              <div className={styles.description}>
                <PortableText value={hero.description} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* GRID */}
      <div className={styles.grid}>
        {rest.map((work, i) => {
          const index = i + 1; // because hero is index 0
          return (
            <div key={work._id} className={styles.gridItem}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={work.imageUrl}
                  alt={work.imageAlt || work.title || "Artwork"}
                  width={work.width || 600}
                  height={work.height || 800}
                  className={styles.image}
                  placeholder={work.lqip ? "blur" : "empty"}
                  blurDataURL={work.lqip}
                />
              </div>

              <div className={styles.metaBlock}>
                <h3 className={styles.titleSmall}>
                  {work.title || "Untitled"}
                </h3>

                <div className={styles.primaryMeta}>
                  {work.year && <span>{work.year}</span>}
                  {work.medium && <span>{work.medium}</span>}
                  {work.editionSize && (
                    <span>Edition of {work.editionSize}</span>
                  )}
                </div>

                <div className={styles.secondaryMeta}>
                  {work.printDetails && <span>{work.printDetails}</span>}
                  {work.dimensions && <span>{work.dimensions}</span>}
                </div>

                {work.description && (
                  <div className={styles.description}>
                    <PortableText value={work.description} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* STATEMENT */}
      {artist.statement && (
        <div className={styles.statement}>
          <PortableText value={artist.statement} />
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
