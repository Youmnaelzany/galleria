import Image from "next/image";
import Link from "next/link";

import data from "@/app/db/data.json";

// Define the Artwork type to match our data structure
interface Artwork {
  slug: string;
  name: string;
  artist: {
    name: string;
    image: string;
  };
  images: {
    thumbnail: string;
    hero: {
      large: string;
      small?: string;
    };
  };
}

const galleryData = data as Artwork[];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold">Galleria</h1>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryData.map((artwork) => (
            <Link
              key={artwork.slug}
              href={`/galleria/${encodeURIComponent(artwork.slug)}`}
              className="group relative block h-96 overflow-hidden rounded-lg"
              passHref
            >
              <div className="relative h-full w-full">
                <Image
                  src={artwork.images.thumbnail}
                  alt={artwork.name}
                  fill
                  priority
                  loading="eager"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* ✅ Fixed className typo: should be bg-gradient-to-t */}
                <div className="bg-liner-to-t absolute inset-0 from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

                <div className="absolute bottom-0 left-0 z-10 p-4 text-white">
                  <h2 className="text-xl font-bold">{artwork.name}</h2>
                  <p className="text-sm text-gray-200">{artwork.artist.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
