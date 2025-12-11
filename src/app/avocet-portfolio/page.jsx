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

  const total = await sanityClient.fetch(`count(*[_type == "avocetArtist"])`);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24">
      {/* Page Title */}
      <h1 className="text-center text-3xl tracking-wide uppercase mt-8 mb-10 text-slate-700">
        Avocet Portfolio
      </h1>

      {/* Grid */}
      <div className={styles.grid}>
        {artists.map((artist) => (
          <Link
            key={artist._id}
            href={`/avocet-portfolio/${artist.slug}`}
            className={styles.gridItem}
          >
            <div className={styles.thumbWrapper}>
              <img
                src={artist.thumbnailUrl}
                alt={
                  artist.thumbnailAlt ||
                  `${artist.firstName} ${artist.lastName}`
                }
                className={styles.thumbImg}
              />
            </div>

            <div className={styles.artistName}>
              {artist.firstName} {artist.lastName}
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.paginationWrapper}>
        <div className={styles.paginationControls}>
          {page > 1 && (
            <Link href={`?page=${page - 1}`} className={styles.paginationPrev}>
              ← Previous
            </Link>
          )}

          {Array.from({ length: totalPages }).map((_, i) => {
            const num = i + 1;
            const active = num === page;
            return (
              <Link
                key={num}
                href={`?page=${num}`}
                className={`${styles.pageNumber} ${
                  active ? styles.pageNumberActive : ""
                }`}
              >
                {num}
              </Link>
            );
          })}

          {page < totalPages && (
            <Link href={`?page=${page + 1}`} className={styles.paginationNext}>
              Next →
            </Link>
          )}
        </div>
      </div>
      <section className="my-10">
        <div className="max-w-[820px] mx-auto px-4">
          <div className="space-y-6 my-2">
            <p>
              The Avocet Portfolio was most recently exhibited June 17–July 30,
              2023 at the Kentler International Drawing Space in Red Hook,
              Brooklyn. The project brings together artists from Art Awareness
              in a collaborative printmaking portfolio created between
              1985–1991.
            </p>

            <p>
              Each artist contributed a print that reflects their own visual
              language while remaining in dialogue with the others in the
              portfolio. The works span a range of approaches and techniques,
              but share an attention to place, memory, and the lived
              environment.
            </p>

            <p>
              This online presentation preserves the structure of the original
              portfolio while making it accessible for research, teaching, and
              general viewing alongside Andrea Callard&apos;s broader body of
              work.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="mt-16 flex flex-col items-center gap-4">
        {/* Breadcrumb-style summary */}
        {/* <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Page <span className="text-slate-800">{page}</span> of{" "}
          <span className="text-slate-800">{totalPages}</span>
        </div> */}

        {/* Pager controls */}
        {/* Pagination */}
      </div>
    </div>
  );
}
