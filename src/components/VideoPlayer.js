// components/VideoPlayer.jsx
import React from "react";
import styles from "../app/films/[title]/FilmPage.module.css";
import ArchiveVideoPlayer from "./ArchiveVideoPlayer";
import YouTubePlayer from "./YouTubePlayer";

export default function VideoPlayer({ archiveUrl, youtubeUrl }) {
  // If we have both types of URLs, prioritize Archive.org
  if (archiveUrl) {
    return <ArchiveVideoPlayer archiveUrl={archiveUrl} />;
  } else if (youtubeUrl) {
    return <YouTubePlayer youtubeUrl={youtubeUrl} />;
  }
  
  // If neither URL is provided, don't render anything
  return null;
}