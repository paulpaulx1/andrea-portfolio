// components/AboutContent.jsx
import { sanityClient } from "../lib/sanity";
import { PortableText } from "@portabletext/react";

// Custom components for rendering Portable Text
const components = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold border-b pb-4 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-8 mb-2">{children}</h3>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

async function getAboutContent() {
  const query = `*[_type == "aboutPage"][0]{
    title,
    content,
    contactEmail
  }`;

  const data = await sanityClient.fetch(query);
  return data;
}

export default async function AboutContent() {
  const aboutData = await getAboutContent();

  if (!aboutData) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-4">
          About Andrea Callard
        </h2>
        <p>Content not yet available. Please add content in Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2>{aboutData.title}</h2>
      <PortableText value={aboutData.content} components={components} />

      {/* {aboutData.contactEmail && (
        <p className="mt-8">
          For inquiries, please contact:{" "}
          <a
            href={`mailto:${aboutData.contactEmail}`}
            className="text-blue-600 hover:underline"
          >
            {aboutData.contactEmail}
          </a>
        </p>
      )} */}
    </div>
  );
}
