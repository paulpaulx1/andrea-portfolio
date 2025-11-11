// app/api/films/[title]/route.js
import { NextResponse } from "next/server";
import { sanityClient } from "@lib/sanity";

// cache this response for one hour
export const revalidate = 3600;

export async function GET(_req, { params }) {
  const { title } = params;

  if (!title) {
    return NextResponse.json(
      { ok: false, error: "Missing film title" },
      { status: 400 }
    );
  }

  try {
    // query by title — titles act as unique identifiers
    // For app/api/films/[title]/route.js, update the query to:
    const query = `
  *[_type == "film" && title == $title][0] {
    _id,
    title,
    year,
    duration,
    type,
    description,
    descriptionRich,
    archiveUrl,
    youtubeUrl,
    images[]{
      asset->{
        url,
        metadata { dimensions }
      }
    },
    relatedFilms
  }
`;

    const film = await sanityClient.fetch(query, {
      title: decodeURIComponent(title),
    });

    if (!film) {
      return NextResponse.json(
        { ok: false, error: "Film not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, film });
  } catch (error) {
    console.error("Error fetching film detail:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch film" },
      { status: 500 }
    );
  }
}
