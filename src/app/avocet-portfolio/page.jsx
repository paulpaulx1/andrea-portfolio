import Link from "next/link";
import { sanityClient } from "@lib/sanity";
import styles from "./AvocetLanding.module.css";

export const metadata = {
  title: "Avocet Portfolio | Andrea Callard",
  description:
    "The Avocet Portfolio is a collaborative printmaking project featuring artists from Art Awareness, created between 1985–1991.",
};

export default async function AvocetLandingPage() {
  const artists = await sanityClient.fetch(`
    *[_type == "avocetArtist"] | order(order asc){
      _id,
      firstName,
      lastName,
      "slug": slug.current,
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": thumbnail.alt
    }
  `);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24">
      {/* Page Title */}
      <h1 className="text-center text-3xl tracking-wide uppercase mt-8 mb-10 text-slate-700">
        Avocet Portfolio
      </h1>

      {/* Thumbnail Grid */}
      <div className={styles.gridWrapper}>
        {artists.map((artist) => (
          <Link
            key={artist._id}
            href={`/avocet-portfolio/${artist.slug}`}
            className="block"
          >
            <div className={styles.thumb}>
              <img
                src={artist.thumbnailUrl}
                alt={
                  artist.thumbnailAlt ||
                  `${artist.firstName} ${artist.lastName}`
                }
              />
            </div>

            <div className={styles.artistName}>
              {artist.firstName} {artist.lastName}
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-16 border-slate-300" />

      {/* TEXT SECTION */}
      <div className="prose prose-slate max-w-none">
        <p>
          The Avocet Portfolio was most recently exhibited June 17–July 30, 2023
          at the Kentler International Drawing Space in Redhook, Brooklyn. The
          Bronx River Art Center offered a similar show November 4, 2023 to
          January 20, 2024.
        </p>

        <p>
          During the summers of 1985–1991, 31 artists created the 48 editions of
          screen prints of the Avocet Portfolio at Art Awareness in Lexington,
          New York in the Catskills. Andrea Callard and Jolie Stahl, both
          members of Collaborative Projects, Inc. (aka COLAB), initiated the
          project. Over seven summers, artists worked to initiate a more social
          and more collaborative production model than the traditional Master
          Printer/Artist relationship. New, non-toxic, pure pigments and
          water-based products being developed by Vince Kennedy of Createx, Ltd.
          were tested. So, the prints have both vivid and subtle color
          interactions.
        </p>

        <p>
          Every summer for twenty five years, Art Awareness hosted visual,
          theatrical, and musical artists as residents and presenters. Decades
          before the current population bloom of the Hudson Valley, a mix of
          regional year-round and summer residents gathered as an arts audience.
          In previous eras, Art Awareness had been a resort hotel through the
          Depression and later a camp for creative children in the 1950's, all
          run by different generations of the same family.
        </p>

        <p>
          Pam and Judd Weisberg directed Art Awareness, one of only two
          non-profit arts organizations supported by the NEA and NYSCA that were
          not located geographically in a city. The place occupied many acres in
          a beautiful valley on the Schoharie Creek in the Catskill Mountains of
          New York. The town dammed up the river each summer to make an
          excellent swimming area. The weather changed often and we could see it
          blowing towards us up the valley.
        </p>

        <p className="mt-6">
          <strong>Andrea Callard</strong>
          <br />
          2023
        </p>
      </div>

      {/* Simple Pagination */}
      <div className="flex items-center justify-center gap-4 mt-16">
        <Link
          href="#"
          className="px-3 py-1 border border-slate-400 text-slate-600 rounded hover:bg-slate-100"
        >
          1
        </Link>
        <Link
          href="#"
          className="px-3 py-1 border border-slate-400 text-slate-600 rounded hover:bg-slate-100"
        >
          2
        </Link>
        <Link
          href="#"
          className="px-3 py-1 border border-slate-400 text-slate-600 rounded hover:bg-slate-100"
        >
          3
        </Link>
        <Link
          href="#"
          className="px-3 py-1 border border-slate-400 text-slate-600 rounded hover:bg-slate-100"
        >
          Next →
        </Link>
      </div>
    </div>
  );
}
