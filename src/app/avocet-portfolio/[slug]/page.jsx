// app/avocet-portfolio/[slug]/page.jsx
import { sanityClient } from "@lib/sanity";
import AvocetArtistClient from "./AvocetArtistClient";
import styles from "./AvocetArtist.module.css";
import { redirect } from "next/navigation";

export const revalidate = 300;

function normalizeSlug(input) {
  if (!input) return "";

  let s = input;
  try {
    s = decodeURIComponent(input);
  } catch {
    // ignore decode errors; treat as already-decoded
  }

  return s
    .trim()
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-") // normalize odd unicode dashes
    .replace(/['’]/g, "") // remove apostrophes
    .replace(/[^a-z0-9]+/g, "-") // spaces & punctuation -> hyphen
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateStaticParams() {
  const artists = await sanityClient.fetch(`
    *[_type == "avocetArtist" && defined(slug.current)]{
      "slug": slug.current
    }
  `);

  return (artists || []).filter((a) => a?.slug).map((a) => ({ slug: a.slug }));
}

async function getArtistData(slugParam) {
  const normalized = normalizeSlug(slugParam);

  const artist = await sanityClient.fetch(
    `
      *[_type == "avocetArtist" && slug.current == $slug][0]{
        _id,
        firstName,
        lastName,
        statement,
        "slug": slug.current
      }
    `,
    { slug: normalized },
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
    { artistId: artist._id },
  );

  return { artist, artworks, normalized };
}

export default async function AvocetArtistPage({ params }) {
  const slugParam = params?.slug || "";
  const data = await getArtistData(slugParam);

  if (!data) {
    return (
      <div className={styles.container}>
        <h1 className="pageHeader" style={{ textAlign: "center" }}>
          Artist Not Found
        </h1>
      </div>
    );
  }

  // ✅ Redirect any non-canonical slug (encoded spaces, wrong casing, etc.)
  // to the canonical slug stored in Sanity
  const canonical = data.artist.slug;
  const normalizedIncoming = normalizeSlug(slugParam);
  if (canonical && normalizedIncoming && canonical !== normalizedIncoming) {
    redirect(`/avocet-portfolio/${canonical}`);
  }

  return <AvocetArtistClient artist={data.artist} artworks={data.artworks} />;
}

export async function generateMetadata({ params }) {
  const slugParam = params?.slug || "";
  const data = await getArtistData(slugParam);
  if (!data) return {};

  const name = `${data.artist.firstName} ${data.artist.lastName}`.trim();
  return {
    title: `${name} | Avocet Portfolio`,
    description: `View works by ${name} in the Avocet Portfolio.`,
  };
}
