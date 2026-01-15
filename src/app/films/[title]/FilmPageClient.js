// app/films/[title]/FilmPageClient.jsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import styles from "./FilmPage.module.css";
import VideoPlayer from "@components/VideoPlayer";
import ImageCarousel from "@components/ImageCarousel";
import Lightbox from "@components/Lightbox";

// Custom components for PortableText to style links
const portableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={target}
          className={styles.textLink}
        >
          {children}
        </a>
      );
    },
  },
};

export default function FilmPageClient({ film }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images =
    film.enhancedImages?.length > 0
      ? film.enhancedImages.map((item) => item.image)
      : film.images || [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const hasVideo = film.archiveUrl || film.youtubeUrl;

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-8">
      <header>
        <p className="text-gray-600"></p>
      </header>

      {!hasVideo && images.length > 0 && (
        <ImageCarousel images={images} openLightbox={openLightbox} />
      )}
      <h1 className="pageHeader" style={{ textAlign: "center" }}>
        {film.title}
      </h1>
      <div className="text-3xl font-bold mb-2">
        {film.year && `${film.year}`}
        {film.duration && ` • ${film.duration}`}
      </div>

      {hasVideo && (
        <VideoPlayer
          archiveUrl={film.archiveUrl}
          youtubeUrl={film.youtubeUrl}
        />
      )}

      {film.descriptionRich && film.descriptionRich.length > 0 && (
        <div className={styles.filmDescription}>
          <PortableText 
            value={film.descriptionRich} 
            components={portableTextComponents}
          />
        </div>
      )}

      {hasVideo && images.length > 0 && (
        <ImageCarousel images={images} openLightbox={openLightbox} />
      )}

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </article>
  );
}