import Link from "next/link";
import { sanityClient } from "@lib/sanity";

export default async function AvocetArtworkPage({ params }) {
  const { slug, artworkSlug } = params;

  const query = `
    *[_type == "avocetArtwork" && slug.current == $artworkSlug][0]{
      _id,
      title,
      year,
      medium,
      editionSize,
      dimensions,
      printDetails,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "artist": artist->{
        firstName,
        lastName,
        "slug": slug.current
      }
    }
  `;

  const artwork = await sanityClient.fetch(query, { artworkSlug });

  if (!artwork) return <div>Artwork not found</div>;

  return (
    <div>
      <Link href={`/avocet-portfolio/${slug}`}>
        ← Back to {artwork.artist.firstName} {artwork.artist.lastName}
      </Link>

      <h1>{artwork.title}</h1>

      {artwork.year && <p><strong>Year:</strong> {artwork.year}</p>}
      {artwork.medium && <p><strong>Medium:</strong> {artwork.medium}</p>}
      {artwork.dimensions && <p><strong>Dimensions:</strong> {artwork.dimensions}</p>}
      {artwork.editionSize && <p><strong>Edition:</strong> {artwork.editionSize}</p>}
      {artwork.printDetails && <p><strong>Print Details:</strong> {artwork.printDetails}</p>}

      {artwork.imageUrl && (
        <img
          src={artwork.imageUrl}
          alt={artwork.imageAlt || artwork.title}
          style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
        />
      )}
    </div>
  );
}
