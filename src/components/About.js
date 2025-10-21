// src/components/About.js
export default function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold border-b pb-4">About Andrea Callard</h1>

      <p>
        Andrea Callard is a filmmaker, photographer, and artist whose work spans
        five decades. Her experimental films explore various spatial, cultural,
        and natural landscapes, often represented through a personal and
        political viewpoint.
      </p>

      <p>
        Her work has been screened at numerous prestigious venues including MOMA
        NYC, the Academy of Motion Picture Arts and Sciences, Walker Art Center,
        Austrian Film Museum Vienna, Glasgow Film Festival, and many others
        around the world.
      </p>

      <p>
        Callard&apos;s filmography includes works on Super 8mm, 16mm film, and
        video, many of which have been preserved and digitized. Her films often
        examine the relationship between humans and their environments, the
        absurdity of explanation, and the limits of the measuring mind.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>
        For inquiries about Andrea Callard&apos;s work, screenings, or other
        information, please contact:{' '}
        <a
          href="mailto:andreacallard@gmail.com"
          className="text-blue-600 hover:underline"
        >
          andreacallard@gmail.com
        </a>
      </p>
    </div>
  );
}
