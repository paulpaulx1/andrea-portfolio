import { sanityClient } from "@lib/sanity";
import AvocetArtistClient from "./AvocetArtistClient";
import styles from "./AvocetArtist.module.css";

export const revalidate = 300;

export async function generateStaticParams() {
  const artists = await sanityClient.fetch(`
    *[_type == "avocetArtist"]{ "slug": slug.current }
  `);

  return artists.map((a) => ({ slug: a.slug }));
}

async function getArtistData(slug) {
  const artist = await sanityClient.fetch(
    `
    *[_type == "avocetArtist" && slug.current == $slug][0]{
      _id,
      firstName,
      lastName,
      statement
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
      "imageUrl": image.asset->url,
      "lqip": image.asset->metadata.lqip,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "imageAlt": image.alt
    }
  `,
    { artistId: artist._id }
  );

  return { artist, artworks };
}

export default async function AvocetArtistPage({ params }) {
  const data = await getArtistData(params.slug);

  if (!data) {
    return (
      <div className={styles.container}>
        <h1 className="pageHeader" style={{ textAlign: "center" }}>
          Artist Not Found
        </h1>
      </div>
    );
  }

  return <AvocetArtistClient artist={data.artist} artworks={data.artworks} />;
}
