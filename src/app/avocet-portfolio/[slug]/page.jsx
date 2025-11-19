import Link from "next/link";
import { sanityClient } from "@lib/sanity";

export default async function AvocetArtistPage({ params }) {
  const { slug } = params;

  // --- Fetch the artist ---
  const artistQuery = `
    *[_type == "avocetArtist" && slug.current == $slug][0]{
      _id,
      firstName,
      lastName,
      statement,
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": thumbnail.alt
    }
  `;

  const artist = await sanityClient.fetch(artistQuery, { slug });

  if (!artist) return <div>Artist not found.</div>;

  // --- Fetch artworks by this artist ---
  const artworksQuery = `
    *[_type == "avocetArtwork" && references($artistId)] | order(order asc){
      _id,
      title,
      year,
      medium,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  `;

  const artworks = await sanityClient.fetch(artworksQuery, {
    artistId: artist._id,
  });

  return (
    <div>
      <h1>
        {artist.firstName} {artist.lastName}
      </h1>

      {/* Artist Statement */}
      {artist.statement?.length > 0 && (
        <div>
          {artist.statement.map((block, i) => (
            <p key={i}>
              {block.children?.map((child) => child.text).join("")}
            </p>
          ))}
        </div>
      )}

      <h2>Artworks</h2>

      <ul>
        {artworks.map((work) => (
          <li key={work._id}>
            <Link href={`/avocet-portfolio/${slug}/${work.slug}`}>
              {work.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}