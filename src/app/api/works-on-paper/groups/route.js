// app/api/works-on-paper/groups/route.js
import { NextResponse } from "next/server";
import { sanityClient } from "@lib/sanity";

// How long Next.js should cache the response (in seconds)
export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    // Lightweight metadata only — just year/location/count
    const query = `
      *[_type == "worksOnPaperGroup"] | order(year desc, location asc) {
        _id,
        year,
        location,
        "workCount": count(*[_type == "workOnPaper" && references(^._id)])
      }
    `;

    const groups = await sanityClient.fetch(query);

    // Organize by year for easy navigation rendering
    const byYear = groups.reduce((acc, group) => {
      if (!acc[group.year]) {
        acc[group.year] = [];
      }
      acc[group.year].push({
        _id: group._id,
        location: group.location,
        workCount: group.workCount,
      });
      return acc;
    }, {});

    return NextResponse.json({ ok: true, byYear });
  } catch (error) {
    console.error("Error fetching works groups:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}
