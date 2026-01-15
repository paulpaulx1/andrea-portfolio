// app/works-on-paper/[year]/[location]/[slug]/page.jsx
import { sanityClient } from "@lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./WorkLightbox.module.css";

export const revalidate = 300; // 5 minutes

// Generate static params for all works
export async function generateStaticParams() {
  const query = `
    *[_type == "workOnPaper"] {
      "slug": slug.current,
      "year": group->year,
      "location": group->location
    }
  `;

  const works = await sanityClient.fetch(query);

  return works.map((work) => ({
    year: work.year.toString(),
    location: encodeURIComponent(work.location),
    slug: work.slug,
  }));
}

async function getWorkData(year, location, slug) {
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
    return null;
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
    image {
      asset-> {
        url,
        metadata {
          lqip
        }
      }
    },
    alt
  }
`;

  const work = await sanityClient.fetch(workQuery, {
    slug,
    groupId: group._id,
  });

  if (!work) {
    return null;
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

  return {
    work,
    group,
    navigation: {
      prev: prevWork,
      next: nextWork,
      currentIndex: currentIndex + 1,
      totalWorks: allWorks.length,
    },
  };
}

export default async function WorkLightboxPage({ params }) {
  const { year, location, slug } = params;
  const data = await getWorkData(year, location, slug);

  if (!data) {
    return (
      <div className={styles.container}>
        <h1>Work Not Found</h1>
        <Link href={`/works-on-paper/${year}/${location}`}>
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const { work, group, navigation } = data;
  const decodedLocation = decodeURIComponent(location);

  return (
    <div className={styles.container}>
      {/* Header with back button and counter */}
      <header className={styles.header}>
        <Link
          href={`/works-on-paper/${year}/${location}`}
          className={styles.backButton}
        >
          ← Back to {group.year} — {decodedLocation}
        </Link>

        <span className={styles.counter}>
          {navigation.currentIndex} of {navigation.totalWorks}
        </span>
      </header>

      {/* Main content area */}
      <div className={styles.content}>
        {/* Image */}
        <div className={styles.imageContainer}>
          {work.image?.asset && (
            <Image
              src={work.image.asset.url}
              alt={work.alt || work.title}
              width={1200}
              height={1600}
              className={styles.image}
              priority
              placeholder={work.image.asset.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={work.image.asset.metadata?.lqip}
            />
          )}
        </div>

        {/* Metadata sidebar */}
        <aside className={styles.metadata}>
          <h1 className={styles.title}>{work.title}</h1>

          {work.dimensions && (
            <p className={styles.metaItem}>
              <span className={styles.metaLabel}>Dimensions:</span>
              <span>{work.dimensions}</span>
            </p>
          )}

          {work.medium && (
            <p className={styles.metaItem}>
              <span className={styles.metaLabel}>Medium:</span>
              <span>{work.medium}</span>
            </p>
          )}

          {work.description && work.description.length > 0 && (
            <div className={styles.description}>
              <PortableText value={work.description} />
            </div>
          )}
        </aside>
      </div>

      {/* Navigation footer */}
      <footer className={styles.navigation}>
        {navigation.prev ? (
          <Link
            href={`/works-on-paper/${year}/${location}/${navigation.prev.slug}`}
            className={styles.navButton}
          >
            ← Previous
            <span className={styles.navTitle}>{navigation.prev.title}</span>
          </Link>
        ) : (
          <div className={styles.navButton} />
        )}

        {navigation.next ? (
          <Link
            href={`/works-on-paper/${year}/${location}/${navigation.next.slug}`}
            className={styles.navButton}
          >
            Next →
            <span className={styles.navTitle}>{navigation.next.title}</span>
          </Link>
        ) : (
          <div className={styles.navButton} />
        )}
      </footer>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { year, location, slug } = params;
  const data = await getWorkData(year, location, slug);

  if (!data) {
    return {
      title: "Work Not Found",
    };
  }

  const { work, group } = data;
  const decodedLocation = decodeURIComponent(location);

  return {
    title: `${work.title} | ${group.year} — ${decodedLocation}`,
    description:
      work.alt || `${work.title} from ${group.year}, ${decodedLocation}`,
  };
}
