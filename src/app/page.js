// app/page.js
import { sanityClient } from "@lib/sanity";
import SmoothCarousel from "@components/SmoothCarousel";
import AboutContent from "@components/AboutContent";
import styles from "./page.module.css";

// Revalidate every hour
export const revalidate = 3600;

async function getHomepageData() {
  const query = `
    *[_type == "homepage"][0] {
      title,
      carouselImages[] {
        "url": image.asset->url,
        "alt": alt,
        "caption": caption,
        "_key": _key,
        "metadata": image.asset->metadata
      },
      autoplaySpeed
    }
  `;
  
  return await sanityClient.fetch(query);
}

export default async function Home() {
  const homepageData = await getHomepageData();
  
  // Format images for the carousel component
  const carouselImages = homepageData?.carouselImages || [];
  
  return (
    <div className={styles.container}>
      {/* Visually hidden title for SEO */}
      <h1 className={styles.visually_hidden}>Andrea Callard</h1>
      
      {/* Carousel Section */}
      {carouselImages.length > 0 ? (
        <div className={styles.carouselWrapper}>
          <SmoothCarousel 
            images={carouselImages} 
            autoplaySpeed={homepageData?.autoplaySpeed || 5000} 
          />
        </div>
      ) : (
        <div className={styles.placeholder}>
          <p>Add carousel images in the Sanity Studio to display here.</p>
        </div>
      )}
      
      {/* About Content Section */}
      <div className={styles.aboutSection}>
        <AboutContent />
      </div>
    </div>
  );
}