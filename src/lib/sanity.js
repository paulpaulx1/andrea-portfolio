// src/lib/sanity.js
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-10-17';
const useCdn = process.env.NODE_ENV === 'production';

export const config = { projectId, dataset, apiVersion, useCdn };

// 🧩 Safely create client only if env vars are present
export const sanityClient =
  projectId && dataset ? createClient(config) : null;

// 🖼️ URL builder also guarded
export const urlFor = (source) =>
  projectId ? imageUrlBuilder(config).image(source) : null;

// 🗂️ Fetch all films
export async function getFilms() {
  if (!sanityClient) return [];
  return sanityClient.fetch(`
    *[_type == "film"] | order(year desc) {
      _id,
      title,
      year,
      duration,
      type,
      description,
      archiveUrl,
      youtubeUrl,
      images,
      relatedFilms
    }
  `);
}

// 🎞️ Fetch a single film by title
export async function getFilm(slug) {
  if (!sanityClient) return null;
  const films = await sanityClient.fetch(
    `*[_type == "film" && title == $title] {
      _id,
      title,
      year,
      duration,
      type,
      description,
      archiveUrl,
      youtubeUrl,
      images,
      relatedFilms
    }`,
    { title: slug }
  );
  return films[0] || null;
}
