// lib/data/nav.js
import { cache } from "react";
import { sanityClient } from "../sanity";

export const getNavFilms = cache(async () => {
  const query = `
    *[_type == "film"] | order(title asc) {
      _id,
      title
    }
  `;

  return sanityClient.fetch(
    query,
    {},
    {
      next: { revalidate: 3600, tags: ["nav", "nav-films"] },
    }
  );
});

export const getNavWorksGroups = cache(async () => {
  const query = `
    *[_type == "worksOnPaperGroup"]
    | order(year desc, location asc) {
      _id,
      title,
      year,
      location,
      // count all works in this group
      "workCount": count(*[_type == "workOnPaper" && references(^._id)])
    }
  `;
  return sanityClient.fetch(query);
});

export const getNavAvocetArtists = cache(async () => {
  const query = `
    *[_type == "avocetArtist"] | order(order asc){
      _id,
      firstName,
      lastName,
      "slug": slug.current
    }
  `;

  return sanityClient.fetch(
    query,
    {},
    {
      next: { revalidate: 3600, tags: ["nav", "nav-avocet"] },
    }
  );
});
