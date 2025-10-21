// app/api/films/route.js
import { NextResponse } from 'next/server';
import { sanityClient } from '@lib/sanity';

// How long Next.js should cache the response (in seconds)
export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    // Lightweight metadata only — no heavy image arrays or long text fields
    const query = `
      *[_type == "film"] | order(year desc) {
        _id,
        title,
        year,
        duration,
        "thumb": images[0].asset->url
      }
    `;

    const films = await sanityClient.fetch(query);

    return NextResponse.json({ ok: true, films });
  } catch (error) {
    console.error('Error fetching film list:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch films' },
      { status: 500 }
    );
  }
}
