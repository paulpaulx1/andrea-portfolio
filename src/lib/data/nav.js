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
    *[_type == "worksOnPaperGroup"] | order(year desc, location asc) {
      _id,
      year,
      location,
      "workCount": count(
        *[_type == "workOnPaper" && references(^._id)]
      )
    }
  `;

  const groups = await sanityClient.fetch(
    query,
    {},
    {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["nav", "nav-works"],
      },
    }
  );

  // ✅ Reshape into:
  // { [year]: [{ _id, location, workCount }] }
  const byYear = {};

  for (const group of groups) {
    const yearKey = String(group.year);

    if (!byYear[yearKey]) {
      byYear[yearKey] = [];
    }

    byYear[yearKey].push({
      _id: group._id,
      location: group.location,
      workCount: group.workCount,
    });
  }

  return byYear;
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
