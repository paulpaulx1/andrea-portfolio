// unchanged imports
import { sanityClient } from "@lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./AvocetArtist.module.css";

export const revalidate = 300;

export async function generateStaticParams() {
  const artists = await sanityClient.fetch(`
    *[_type == "avocetArtist"] { "slug": slug.current }
  `);

  return artists.map((a) => ({ slug: a.slug }));
}

async function getArtistData(slug) {
  const artist = await sanityClient.fetch(
    `
    *[_type == "avocetArtist" && slug.current == $slug][0]{
      _id, firstName, lastName, statement
    }
  `,
    { slug }
  );

  if (!artist) return null;

  const artworks = await sanityClient.fetch(
    `
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
  `,
    { artistId: artist._id }
  );

  return { artist, artworks };
}

export default async function AvocetArtistPage({ params }) {
  const data = await getArtistData(params.slug);
  if (!data) return <div>Artist not found</div>;

  const { artist, artworks } = data;
  const hero = artworks[0];
  const rest = artworks.slice(1);

  return (
    <div className={styles.container}>
      <h1 className="pageHeader" style={{ textAlign: "center" }}>
        {artist.firstName} {artist.lastName}
      </h1>

      {/* HERO */}
      {hero && (
        <div className={styles.heroSection}>
          <Link href={`/avocet-portfolio/${params.slug}/${hero.slug}`}>
            <Image
              src={hero.imageUrl}
              alt={hero.imageAlt || hero.title}
              width={800}
              height={1000}
              className={styles.image}
              priority
              placeholder={hero.imageBlur ? "blur" : "empty"}
              blurDataURL={hero.imageBlur}
            />
          </Link>

          <div className={styles.metaBlock}>
            <h2 className={styles.title}>{hero.title}</h2>

            <div className={styles.primaryMeta}>
              {hero.year && <span>{hero.year}</span>}
              {hero.medium && <span>{hero.medium}</span>}
              {hero.editionSize && <span>Edition of {hero.editionSize}</span>}
            </div>

            <div className={styles.secondaryMeta}>
              {hero.printDetails && <span>{hero.printDetails}</span>}
              {hero.dimensions && <span>{hero.dimensions}</span>}
            </div>

            {hero.description && (
              <div className={styles.description}>
                <PortableText value={hero.description} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* GRID */}
      <div className={styles.grid}>
        {rest.map((work) => (
          <div key={work._id} className={styles.gridItem}>
            <Link href={`/avocet-portfolio/${params.slug}/${work.slug}`}>
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

            <div className={styles.metaBlock}>
              <h3 className={styles.titleSmall}>{work.title}</h3>

              <div className={styles.primaryMeta}>
                {work.year && <span>{work.year}</span>}
                {work.medium && <span>{work.medium}</span>}
                {work.editionSize && <span>Edition of {work.editionSize}</span>}
              </div>

              <div className={styles.secondaryMeta}>
                {work.printDetails && <span>{work.printDetails}</span>}
                {work.dimensions && <span>{work.dimensions}</span>}
              </div>

              {work.description && (
                <div className={styles.description}>
                  <PortableText value={work.description} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {artist.statement && (
        <div className={styles.statement}>
          <PortableText value={artist.statement} />
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getArtistData(slug);

  if (!data) return { title: "Artist Not Found" };

  const { artist } = data;
  return {
    title: `${artist.firstName} ${artist.lastName} | Avocet Portfolio`,
    description: `View works by ${artist.firstName} ${artist.lastName} from the Avocet Portfolio`,
  };
}
