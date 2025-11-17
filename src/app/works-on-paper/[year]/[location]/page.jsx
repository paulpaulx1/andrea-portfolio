// app/works-on-paper/[year]/[location]/page.jsx
import { sanityClient } from "@lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
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

  // Fetch all works in this group
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
        <Link href="/">Return Home</Link>
      </div>
    );
  }

  const { group, works } = data;
  const decodedLocation = decodeURIComponent(location);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {group.year} — {decodedLocation}
        </h1>

        {group.groupDescription && group.groupDescription.length > 0 && (
          <div className={styles.description}>
            <PortableText value={group.groupDescription} />
          </div>
        )}

        <p className={styles.workCount}>
          {works.length} {works.length === 1 ? "work" : "works"}
        </p>
      </header>

      <div className={styles.grid}>
        {works.map((work) => (
          <Link
            key={work._id}
            href={`/works-on-paper/${year}/${location}/${work.slug}`}
            className={styles.gridItem}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={work.imageUrl}
                alt={work.alt || work.title}
                width={600}
                height={800}
                className={styles.image}
                placeholder={work.lqip ? "blur" : "empty"}
                blurDataURL={work.lqip}
              />
            </div>

            <div className={styles.itemInfo}>
              <h3 className={styles.itemTitle}>{work.title}</h3>
              {work.dimensions && (
                <p className={styles.itemMeta}>{work.dimensions}</p>
              )}
              {work.medium && <p className={styles.itemMeta}>{work.medium}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
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
