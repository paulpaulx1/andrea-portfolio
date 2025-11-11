// app/films/[title]/FilmPageClient.jsx
'use client';
import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import styles from "./FilmPage.module.css";
import VideoPlayer from "@components/VideoPlayer";
import ImageCarousel from "@components/ImageCarousel";
import Lightbox from "@components/Lightbox";

export default function FilmPageClient({ film }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Function to open the lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Check if the film has a video (either Archive.org or YouTube)
  const hasVideo = film.archiveUrl || film.youtubeUrl;

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">{film.title}</h1>
        <p className="text-gray-600">
          {film.year || "Year unknown"}
          {film.duration && ` • ${film.duration}`}
        </p>
      </header>

      {/* Conditional rendering based on video presence */}
      {/* If no video, show carousel at the top */}
      {!hasVideo && film.images?.length > 0 && (
        <ImageCarousel images={film.images} openLightbox={openLightbox} />
      )}

      {/* Video player for either Archive.org or YouTube */}
      {hasVideo && (
        <VideoPlayer
          archiveUrl={film.archiveUrl}
          youtubeUrl={film.youtubeUrl}
        />
      )}

      {/* Film description - only using rich text now */}
      {film.description && film.description.length > 0 && (
        <div className="text-slate-800">
          <PortableText value={film.descriptionRich} />
        </div>
      )}

      {/* If there is a video, show carousel after the text */}
      {hasVideo && film.images?.length > 0 && (
        <ImageCarousel images={film.images} openLightbox={openLightbox} />
      )}

      {/* External links */}
      <div className="space-x-4">
        {film.archiveUrl && (
          <a
            href={film.archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on Archive.org
          </a>
        )}
        {film.youtubeUrl && (
          <a
            href={film.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Watch on YouTube
          </a>
        )}
      </div>

      {/* Lightbox for full-screen images */}
      {lightboxOpen && (
        <Lightbox
          images={film.images}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </article>
  );
}
