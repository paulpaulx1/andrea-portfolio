// src/components/FilmCard.js
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

export default function FilmCard({ film }) {
  if (!film) return null;

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">{film.title}</h1>
        <div className="flex mt-2 text-sm text-gray-600 gap-4">
          {film.year && <span>Year: {film.year}</span>}
          {film.duration && <span>Duration: {film.duration}</span>}
          {film.type && <span>Type: {film.type}</span>}
        </div>
      </div>
      
      {/* Main film image */}
      {film.images && film.images.length > 0 && (
        <div className="relative h-64 bg-gray-100 rounded overflow-hidden">
          <Image
            src={urlFor(film.images[0]).width(1200).height(800).url()}
            alt={film.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}
      
      {/* Video player */}
      {(film.archiveUrl || film.youtubeUrl) && (
        <div className="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden">
          {film.youtubeUrl && (
            <iframe 
              src={film.youtubeUrl.replace('youtu.be/', 'youtube.com/embed/')}
              title={film.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          )}
          {!film.youtubeUrl && film.archiveUrl && (
            <iframe 
              src={film.archiveUrl.replace('details/', 'embed/')}
              title={film.title}
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          )}
        </div>
      )}
      
      {/* Description */}
      {film.description && (
        <div>
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <div className="prose max-w-none">
            {film.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}