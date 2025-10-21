// src/lib/sanity.js
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-10-17',
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(config);

export const urlFor = (source) => imageUrlBuilder(config).image(source);

// Fetch all films
export async function getFilms() {
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

// Fetch a single film by slug (using title as slug)
export async function getFilm(slug) {
  const films = await sanityClient.fetch(`
    *[_type == "film" && title == $title] {
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
  `, { title: slug });
  
  return films[0] || null;
}