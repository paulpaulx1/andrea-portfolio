// app/works-on-paper/[slug]/page.jsx
import { sanityClient } from "@lib/sanity";
import WorksGridClient from "./WorksGridClient";
import styles from "./WorksGrid.module.css";

export const revalidate = 300;

// Helper to create slug from group data
function createSlug(year, location, title) {
  const parts = [year, location];
  if (title) {
    parts.push(title);
  }
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
}

// Helper to parse slug back to components
function parseSlug(slug) {
  // This is trickier - we'll query all groups and match
  return slug;
}

export async function generateStaticParams() {
  const query = `
    *[_type == "worksOnPaperGroup"] {
      year,
      location,
      title
    }
  `;

  const groups = await sanityClient.fetch(query);

  return groups.map((group) => ({
    slug: createSlug(group.year, group.location, group.title),
  }));
}

async function getWorksData(slug) {
  // Fetch all groups and find the matching one
  const groupsQuery = `
    *[_type == "worksOnPaperGroup"] {
      _id,
      year,
      location,
      title,
      groupDescription,
      serialization{
        enabled,
        mode,
        scope
      }
    }
  `;

  const groups = await sanityClient.fetch(groupsQuery);

  // Find the group that matches this slug
  const group = groups.find(
    (g) => createSlug(g.year, g.location, g.title) === slug
  );

  if (!group) {
    return null;
  }

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
  const { slug } = params;
  const data = await getWorksData(slug);

  if (!data) {
    return (
      <div className={styles.container}>
        <h1>Portfolio Not Found</h1>
      </div>
    );
  }

  const { group, works } = data;

  return <WorksGridClient group={group} works={works} />;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getWorksData(slug);

  if (!data) return {};

  const { group } = data;
  const title = group.title || `${group.year} — ${group.location}`;

  return {
    title: `${title} | Works on Paper`,
    description:
      group.groupDescription ||
      `View works on paper from ${group.year}, ${group.location}`,
  };
}
