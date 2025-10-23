// app/films/[title]/page.js
import { sanityClient } from "@lib/sanity";
import FilmPageClient from "./FilmPageClient";

export const revalidate = 3600;

export default async function FilmPage({ params }) {
  const { title } = params;

  const query = `
  *[_type == "film" && title == $title][0] {
    _id,
    title,
    year,
    duration,
    type,
    description,
    descriptionRich,
    archiveUrl,
    youtubeUrl,
    images[]{
      asset->{ url, metadata { dimensions } }
    },
    relatedFilms
  }
`;

  const film = await sanityClient.fetch(query, {
    title: decodeURIComponent(title),
  });

  if (!film) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-4">Film not found</h1>
        <p>The requested film could not be located in the archive.</p>
      </div>
    );
  }

  return <FilmPageClient film={film} />;
}