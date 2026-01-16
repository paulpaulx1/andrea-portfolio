import Link from "next/link";
import { sanityClient } from "@lib/sanity";
import { PortableText } from "@portabletext/react";
import styles from "./AvocetLanding.module.css";

export const metadata = {
  title: "Avocet Portfolio | Andrea Callard",
  description:
    "The Avocet Portfolio is a collaborative printmaking project featuring artists from Art Awareness, created between 1985–1991.",
};

// Custom components for rendering Portable Text
const components = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mt-8 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mt-6 mb-2">{children}</h3>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

async function getAvocetLandingContent() {
  const query = `*[_type == "avocetLanding"][0]{
    title,
    content
  }`;

  const data = await sanityClient.fetch(query);
  return data;
}

export default async function AvocetLandingPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const perPage = 12;
  const start = (page - 1) * perPage;

  // Fetch artists
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

  // Fetch landing page content
  const landingContent = await getAvocetLandingContent();

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24">
      {/* Page Title */}
      <h1 className="pageHeader text-center" style={{ textAlign: "center" }}>
        {landingContent?.title || "Avocet Portfolio"}
      </h1>

      {/* Introduction Section */}
      <section className="my-10">
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 1rem" }}>
          {landingContent?.content ? (
            <div className="space-y-6 my-2">
              <PortableText
                value={landingContent.content}
                components={components}
              />
            </div>
          ) : (
            <div className="space-y-6 my-2">
              <p>
                The Avocet Portfolio was most recently exhibited in 2023 at the
                Kentler International Drawing Space in Red Hook, Brooklyn.
                Throughout the fall of 2023, the Bronx River Arts Center showed
                the portfolio. The project brought together artists in a
                collaborative printmaking studio. Located at Art Awareness in
                upstate New York, it took place during the summers of 1985–1991.
              </p>

              <p>
                Each artist made prints reflecting their own visual language
                while remaining in dialogue with the other artists present. The
                works span a range of approaches and techniques, but share an
                attention to place, memory, and the lived environment.
              </p>

              <p>
                This online presentation preserves the structure of the original
                portfolio while making it accessible for research, teaching, and
                general viewing alongside Andrea Callard&apos;s broader body of
                work.
              </p>
            </div>
          )}
        </div>
      </section>

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
    </div>
  );
}
