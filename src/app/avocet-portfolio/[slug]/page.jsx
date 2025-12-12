// app/avocet-portfolio/[slug]/page.jsx
import { sanityClient } from "@lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./AvocetArtist.module.css";

export const revalidate = 300; // 5 minutes

// Generate static params for all artists
export async function generateStaticParams() {
  const query = `
    *[_type == "avocetArtist"] {
      "slug": slug.current
    }
  `;

  const artists = await sanityClient.fetch(query);

  return artists.map((artist) => ({
    slug: artist.slug,
  }));
}

async function getArtistData(slug) {
  // Fetch the artist
  const artistQuery = `
    *[_type == "avocetArtist" && slug.current == $slug][0]{
      _id,
      firstName,
      lastName,
      statement
    }
  `;

  const artist = await sanityClient.fetch(artistQuery, { slug });

  if (!artist) {
    return null;
  }

  // Fetch artworks by this artist
  const artworksQuery = `
    *[_type == "avocetArtwork" && references($artistId)] | order(order asc){
      _id,
      title,
      year,
      medium,
      editionSize,
      printDetails,
      dimensions,
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageBlur": image.asset->metadata.lqip,
      "imageAlt": image.alt
    }
  `;

  const artworks = await sanityClient.fetch(artworksQuery, {
    artistId: artist._id,
  });

  return { artist, artworks };
}

export default async function AvocetArtistPage({ params }) {
  const { slug } = params;
  const data = await getArtistData(slug);

  if (!data) {
    return (
      <div className={styles.container}>
        <h1>Artist not found</h1>
        <Link href="/avocet-portfolio">Back to Portfolio</Link>
      </div>
    );
  }

  const { artist, artworks } = data;

  // First artwork is the hero
  const heroArtwork = artworks[0];
  // Remaining artworks go in the grid
  const gridArtworks = artworks.slice(1);

  return (
    <div className={styles.container}>
      {/* Artist Name */}
      <h1 className="pageHeader" style={{ textAlign: "center" }}>
        {artist.firstName} {artist.lastName}
      </h1>

      {/* Hero Section: Large image on left, info on right */}
      {heroArtwork && (
        <div className={styles.heroSection}>
          <Link
            href={`/avocet-portfolio/${slug}/${heroArtwork.slug}`}
            className={styles.heroImage}
          >
            <Image
              src={heroArtwork.imageUrl}
              alt={heroArtwork.imageAlt || heroArtwork.title}
              width={800}
              height={1000}
              className={styles.image}
              priority
              placeholder={heroArtwork.imageBlur ? "blur" : "empty"}
              blurDataURL={heroArtwork.imageBlur}
            />
          </Link>

          <div className={styles.heroInfo}>
            <h2 className={styles.artworkTitle}>{heroArtwork.title}</h2>

            {heroArtwork.year && (
              <p className={styles.infoItem}>{heroArtwork.year}</p>
            )}

            {heroArtwork.medium && (
              <p className={styles.infoItem}>{heroArtwork.medium}</p>
            )}

            {heroArtwork.editionSize && (
              <p className={styles.infoItem}>{heroArtwork.editionSize}</p>
            )}

            {heroArtwork.printDetails && (
              <p className={styles.infoItem}>{heroArtwork.printDetails}</p>
            )}

            {heroArtwork.dimensions && (
              <p className={styles.infoItem}>{heroArtwork.dimensions}</p>
            )}

            {heroArtwork.description && heroArtwork.description.length > 0 && (
              <div className={styles.artworkDescription}>
                <PortableText value={heroArtwork.description} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Masonry Grid for remaining artworks */}
      {gridArtworks.length > 0 && (
        <div className={styles.grid}>
          {gridArtworks.map((work) => (
            <div key={work._id} className={styles.gridItem}>
              <Link
                href={`/avocet-portfolio/${slug}/${work.slug}`}
                className={styles.gridImageLink}
              >
                <Image
                  src={work.imageUrl}
                  alt={work.imageAlt || work.title}
                  width={600}
                  height={800}
                  className={styles.image}
                  placeholder={work.imageBlur ? "blur" : "empty"}
                  blurDataURL={work.imageBlur}
                />
              </Link>

              <div className={styles.gridInfo}>
                <h3 className={styles.gridTitle}>{work.title}</h3>

                {work.year && <p className={styles.gridMeta}>{work.year}</p>}

                {work.medium && (
                  <p className={styles.gridMeta}>{work.medium}</p>
                )}

                {work.editionSize && (
                  <p className={styles.gridMeta}>{work.editionSize}</p>
                )}

                {work.printDetails && (
                  <p className={styles.gridMeta}>{work.printDetails}</p>
                )}

                {work.dimensions && (
                  <p className={styles.gridMeta}>{work.dimensions}</p>
                )}

                {work.description && work.description.length > 0 && (
                  <div className={styles.gridDescription}>
                    <PortableText value={work.description} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Artist Statement Block */}
      {artist.statement && artist.statement.length > 0 && (
        <div className={styles.statementSection}>
          <div className={styles.statement}>
            <PortableText value={artist.statement} />
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className={styles.backLink}>
        <Link href="/avocet-portfolio">← Back to Avocet Portfolio</Link>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getArtistData(slug);

  if (!data) {
    return {
      title: "Artist Not Found",
    };
  }

  const { artist } = data;

  return {
    title: `${artist.firstName} ${artist.lastName} | Avocet Portfolio`,
    description: `View works by ${artist.firstName} ${artist.lastName} from the Avocet Portfolio`,
  };
}
