// app/works-on-paper/[year]/[location]/page.jsx
import { sanityClient } from "@lib/sanity";
import WorksGridClient from "./WorksGridClient";
import styles from "./WorksGrid.module.css";

export const revalidate = 300; // 5 minutes

// Generate static params for all year/location combos
export async function generateStaticParams() {
  const query = `
    *[_type == "worksOnPaperGroup"] {
      year,
      location
    }
  `;

  const groups = await sanityClient.fetch(query);

  return groups.map((group) => ({
    year: group.year.toString(),
    location: encodeURIComponent(group.location),
  }));
}

async function getWorksData(year, location) {
  const yearNum = parseInt(year);
  const decodedLocation = decodeURIComponent(location);

  // Find the group
  const groupQuery = `
    *[_type == "worksOnPaperGroup" && year == $year && location == $location][0] {
      _id,
      year,
      location,
      groupDescription
    }
  `;

  const group = await sanityClient.fetch(groupQuery, {
    year: yearNum,
    location: decodedLocation,
  });

  if (!group) {
    return null;
  }

  // Fetch all works in this group - include image dimensions
  const worksQuery = `
  *[_type == "workOnPaper" && references($groupId)] | order(number asc) {
    _id,
    title,
    "slug": slug.current,
    number,
    dimensions,
    medium,
    "imageUrl": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    alt
  }
`;

  const works = await sanityClient.fetch(worksQuery, { groupId: group._id });

  return { group, works };
}

export default async function WorksGridPage({ params }) {
  const { year, location } = params;
  const data = await getWorksData(year, location);

  if (!data) {
    return (
      <div className={styles.container}>
        <h1>Portfolio Not Found</h1>
      </div>
    );
  }

  const { group, works } = data;

  return <WorksGridClient group={group} works={works} year={year} location={location} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { year, location } = params;
  const decodedLocation = decodeURIComponent(location);

  return {
    title: `${year} — ${decodedLocation} | Works on Paper`,
    description: `View works on paper from ${year}, ${decodedLocation}`,
  };
}