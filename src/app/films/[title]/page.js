// app/films/[title]/page.js
import Image from "next/image";
import { sanityClient } from "@lib/sanity";
import { PortableText } from "@portabletext/react";
import styles from "./FilmPage.module.css";
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
    descriptionRich,  // Add this line to fetch the rich text field
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

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">{film.title}</h1>
        <p className="text-gray-600">
          {film.year || "Year unknown"}
          {film.duration && ` • ${film.duration}`}
        </p>
      </header>

      {film.descriptionRich ? (
        <div className="text-slate-800">
          <PortableText value={film.descriptionRich} />
        </div>
      ) : (
        film.description && (
          <p className="text-gray-800 whitespace-pre-line">
            {film.description}
          </p>
        )
      )}

      {/* external links */}
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

      {/* stills */}
      {film.images?.length > 0 && (
        <section className={styles.imagesGrid}>
          {film.images.map((img, i) => {
            const { width, height } = img.asset.metadata?.dimensions || {};
            return (
              <div key={i} className={styles.imageWrap}>
                <Image
                  src={img.asset.url}
                  alt={`${film.title} still ${i + 1}`}
                  width={width || 800}
                  height={height || 600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            );
          })}
        </section>
      )}
    </article>
  );
}
