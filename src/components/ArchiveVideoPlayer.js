// components/ArchiveVideoPlayer.jsx
import React from "react";
import styles from "../app/films/[title]/FilmPage.module.css";

export default function ArchiveVideoPlayer({ archiveUrl }) {
  // Return null if there's no Archive.org URL
  if (!archiveUrl) return null;

  // Extract the Archive.org identifier from the URL
  // Archive.org URLs typically look like:
  // https://archive.org/details/IDENTIFIER
  let identifier = "";
  
  try {
    // Extract identifier from various possible URL formats
    const urlObj = new URL(archiveUrl);
    const pathParts = urlObj.pathname.split("/");
    
    if (urlObj.hostname.includes("archive.org")) {
      if (pathParts.includes("details")) {
        // Standard format: https://archive.org/details/IDENTIFIER
        const detailsIndex = pathParts.indexOf("details");
        if (detailsIndex !== -1 && pathParts.length > detailsIndex + 1) {
          identifier = pathParts[detailsIndex + 1];
        }
      } else if (pathParts.length > 1) {
        // Fallback: try to get the identifier from the path
        identifier = pathParts[pathParts.length - 1];
      }
    }
  } catch (error) {
    console.error("Error parsing Archive.org URL:", error);
    return null;
  }

  // If we couldn't extract an identifier, don't render anything
  if (!identifier) return null;

  // Create the embed URL
  const embedUrl = `https://archive.org/embed/${identifier}`;

  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={embedUrl}
        width="640"
        height="480"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
        title={`Archive.org video player: ${identifier}`}
      ></iframe>
    </div>
  );
}