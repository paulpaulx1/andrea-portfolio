// src/components/MainContent.js
'use client';

import About from './AboutContent';

/**
 * MainContent
 * This is the default landing section shown on the homepage.
 * Film pages are now fully handled by /films/[title]/page.js,
 * so this component no longer needs event listeners or local state.
 */
export default function MainContent() {
  return (
    <section className="p-6">
      <About />
    </section>
  );
}