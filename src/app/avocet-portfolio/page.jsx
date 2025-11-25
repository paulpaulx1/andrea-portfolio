import Link from "next/link";
import { sanityClient } from "@lib/sanity";
import styles from "./AvocetLanding.module.css";

export const metadata = {
  title: "Avocet Portfolio | Andrea Callard",
  description:
    "The Avocet Portfolio is a collaborative printmaking project featuring artists from Art Awareness, created between 1985–1991.",
};

export default async function AvocetLandingPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const perPage = 12;
  const start = (page - 1) * perPage;

  const artists = await sanityClient.fetch(
    `
      *[_type == "avocetArtist"] | order(order asc){
        _id,
        firstName,
        lastName,
        "slug": slug.current,
        "thumbnailUrl": thumbnail.asset->url,
        "thumbnailAlt": thumbnail.alt
      }[${start}...${start + perPage}]
    `
  );

  const total = await sanityClient.fetch(
    `count(*[_type == "avocetArtist"])`
  );

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24">
      {/* Page Title */}
      <h1 className="text-center text-3xl tracking-wide uppercase mt-8 mb-10 text-slate-700">
        Avocet Portfolio
      </h1>

      {/* Masonry Grid */}
      <div className={styles.masonry}>
        {artists.map((artist) => (
          <Link
            key={artist._id}
            href={`/avocet-portfolio/${artist.slug}`}
            className={styles.masonryItem}
          >
            <img
              src={artist.thumbnailUrl}
              alt={
                artist.thumbnailAlt ||
                `${artist.firstName} ${artist.lastName}`
              }
              className={styles.thumbImg}
            />

            <div className={styles.artistName}>
              {artist.firstName} {artist.lastName}
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-16 border-slate-300" />

      {/* TEXT SECTION — unchanged */}
      <div className="prose prose-slate max-w-none">
        <p>
          The Avocet Portfolio was most recently exhibited June 17–July 30, 2023
          at the Kentler International Drawing Space in Redhook, Brooklyn...
        </p>

      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-16">
        {Array.from({ length: totalPages }).map((_, i) => {
          const num = i + 1;
          const active = num === page;
          return (
            <Link
              key={num}
              href={`?page=${num}`}
              className={`px-3 py-1 border rounded ${
                active
                  ? "bg-slate-700 text-white border-slate-700"
                  : "border-slate-400 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {num}
            </Link>
          );
        })}

        {page < totalPages && (
          <Link
            href={`?page=${page + 1}`}
            className="px-3 py-1 border border-slate-400 text-slate-600 rounded hover:bg-slate-100"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
