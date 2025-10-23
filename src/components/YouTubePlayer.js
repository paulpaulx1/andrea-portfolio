// components/YouTubePlayer.jsx
import React from "react";
import styles from "../app/films/[title]/FilmPage.module.css";

export default function YouTubePlayer({ youtubeUrl }) {
  // Return null if there's no YouTube URL
  if (!youtubeUrl) return null;

  // Extract the YouTube video ID from the URL
  let videoId = "";
  
  try {
    // Extract video ID from various YouTube URL formats
    if (youtubeUrl.includes("youtube.com") || youtubeUrl.includes("youtu.be")) {
      // Format: youtube.com/watch?v=VIDEO_ID
      if (youtubeUrl.includes("watch?v=")) {
        const urlObj = new URL(youtubeUrl);
        videoId = urlObj.searchParams.get("v");
      } 
      // Format: youtu.be/VIDEO_ID
      else if (youtubeUrl.includes("youtu.be/")) {
        const urlObj = new URL(youtubeUrl);
        videoId = urlObj.pathname.split("/")[1];
      }
      // Format: youtube.com/embed/VIDEO_ID
      else if (youtubeUrl.includes("/embed/")) {
        const urlObj = new URL(youtubeUrl);
        const parts = urlObj.pathname.split("/embed/");
        if (parts.length > 1) {
          videoId = parts[1];
        }
      }
    }
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
    return null;
  }

  // If we couldn't extract a video ID, don't render anything
  if (!videoId) return null;

  // Create the embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={embedUrl}
        width="640"
        height="480"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`YouTube video player: ${videoId}`}
      ></iframe>
    </div>
  );
}