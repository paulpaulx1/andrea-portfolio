// app/api/works-on-paper/[year]/[location]/[slug]/route.js
import { NextResponse } from "next/server";
import { sanityClient } from "@lib/sanity";

export const revalidate = 300; // 5 minutes

export async function GET(request, { params }) {
  try {
    const { year, location, slug } = params;
    const yearNum = parseInt(year);
    const decodedLocation = decodeURIComponent(location);

    // Find the group
    const groupQuery = `
      *[_type == "worksOnPaperGroup" && year == $year && location == $location][0] {
        _id,
        year,
        location
      }
    `;

    const group = await sanityClient.fetch(groupQuery, {
      year: yearNum,
      location: decodedLocation,
    });

    if (!group) {
      return NextResponse.json(
        { ok: false, error: "Group not found" },
        { status: 404 }
      );
    }

    // Find the specific work
    const workQuery = `
      *[_type == "workOnPaper" && slug.current == $slug && references($groupId)][0] {
        _id,
        title,
        "slug": slug.current,
        number,
        description,
        dimensions,
        medium,
        image,
        alt
      }
    `;

    const work = await sanityClient.fetch(workQuery, {
      slug,
      groupId: group._id,
    });

    if (!work) {
      return NextResponse.json(
        { ok: false, error: "Work not found" },
        { status: 404 }
      );
    }

    // Get all works in the group for prev/next navigation
    const allWorksQuery = `
      *[_type == "workOnPaper" && references($groupId)] | order(number asc) {
        _id,
        "slug": slug.current,
        title,
        number
      }
    `;

    const allWorks = await sanityClient.fetch(allWorksQuery, {
      groupId: group._id,
    });

    // Find current index and get prev/next
    const currentIndex = allWorks.findIndex((w) => w.slug === slug);
    const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
    const nextWork =
      currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

    return NextResponse.json({
      ok: true,
      work,
      group,
      navigation: {
        prev: prevWork ? { slug: prevWork.slug, title: prevWork.title } : null,
        next: nextWork ? { slug: nextWork.slug, title: nextWork.title } : null,
        currentIndex: currentIndex + 1,
        totalWorks: allWorks.length,
      },
    });
  } catch (error) {
    console.error("Error fetching work:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch work" },
      { status: 500 }
    );
  }
}
