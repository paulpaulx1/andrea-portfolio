// app/about/page.js
import AboutContent from "@/components/AboutContent";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <AboutContent />
    </div>
  );
}