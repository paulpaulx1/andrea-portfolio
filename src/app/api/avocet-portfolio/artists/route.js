// app/api/avocet-portfolio/artists/route.js
import { sanityClient } from "@lib/sanity";

export async function GET() {
  const query = `
    *[_type == "avocetArtist"] | order(order asc) {
      _id,
      firstName,
      lastName,
      "slug": slug.current
    }
  `;

  const artists = await sanityClient.fetch(query);

  return Response.json({ artists });
}
