// app/avocet-portfolio/[slug]/page.jsx
import { sanityClient } from "@lib/sanity";
import AvocetArtistClient from "./AvocetArtistClient";
import styles from "./AvocetArtist.module.css";
import { redirect, notFound } from "next/navigation";

export const revalidate = 300;

function safeDecode(input) {
  if (!input) return "";
  try {
    return decodeURIComponent(input);
  } catch {
    return input; // already decoded / malformed
  }
}

function normalizeSlug(input) {
  if (!input) return "";

  return input
    .trim()
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-") // normalize odd unicode dashes
    .replace(/['’]/g, "") // remove apostrophes
    .replace(/_/g, "-") // underscores -> hyphens (WP-style)
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
  // raw decoded (keeps underscores etc)
  const decodedRaw = safeDecode(slugParam).trim().toLowerCase();

  // normalized (your canonical preferred form)
  const normalized = normalizeSlug(decodedRaw);

  // also try "underscore version" just in case something stored that way
  const underscoreVariant = normalized.replace(/-/g, "_");

  // Try all candidates in one query (fast + avoids weird edge cases)
  const artist = await sanityClient.fetch(
    `
      *[
        _type == "avocetArtist" &&
        defined(slug.current) &&
        slug.current in $candidates
      ][0]{
        _id,
        firstName,
        lastName,
        statement,
        "slug": slug.current
      }
    `,
    { candidates: [decodedRaw, normalized, underscoreVariant].filter(Boolean) },
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

  return { artist, artworks, decodedRaw, normalized };
}

export default async function AvocetArtistPage({ params }) {
  // ✅ Next 15: params must be awaited
  const { slug: slugParam = "" } = await params;

  const data = await getArtistData(slugParam);
  if (!data) notFound();

  // ✅ Canonical redirect WITHOUT normalization mismatch loops:
  // Compare decoded incoming RAW to canonical RAW.
  // (Do NOT compare canonical to normalized; that causes loops when canonical contains '_' etc.)
  const incomingRaw = safeDecode(slugParam).trim().toLowerCase();
  const canonicalRaw = (data.artist.slug || "").trim().toLowerCase();

  if (canonicalRaw && incomingRaw && canonicalRaw !== incomingRaw) {
    redirect(`/avocet-portfolio/${encodeURIComponent(canonicalRaw)}`);
  }

  return <AvocetArtistClient artist={data.artist} artworks={data.artworks} />;
}

export async function generateMetadata({ params }) {
  const { slug: slugParam = "" } = await params;

  const data = await getArtistData(slugParam);
  if (!data) return {};

  const name =
    `${data.artist.firstName || ""} ${data.artist.lastName || ""}`.trim();

  return {
    title: `${name} | Avocet Portfolio`,
    description: `View works by ${name} in the Avocet Portfolio.`,
  };
}
