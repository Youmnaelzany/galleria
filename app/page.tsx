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
        <header className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
          <Link href="/">
            <Image
              src="/shared/logo.svg"
              alt="Galleria"
              width={170}
              height={40}
            />
          </Link>
          <Link
            href="/galleria/starry-night"
            className="text-[12px] leading-[125%] font-bold tracking-[2.5px] text-[#7D7D7D] uppercase transition-colors duration-300 ease-in-out hover:text-black"
          >
            Start Slideshow
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryData.map((artwork) => (
            <Link
              key={artwork.slug}
              href={`/galleria/${encodeURIComponent(artwork.slug)}`}
              className="group relative block h-96 overflow-hidden"
              passHref
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  src={artwork.images.thumbnail}
                  alt={artwork.name}
                  width={126}
                  height={126}
                  priority
                  loading="eager"
                  className="h-auto max-h-full w-auto max-w-full transition-transform duration-300 group-hover:scale-105"
                />

                {/* ✅ Fixed className typo: should be bg-gradient-to-t */}
                <div className="bg-liner-to-t absolute inset-0 from-black to-black/60 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 z-10 space-y-2 p-8 text-white">
                  <h2 className="text-2xl leading-[125%] font-bold tracking-normal">
                    {artwork.name}
                  </h2>
                  <p className="text-sm leading-[125%] font-normal tracking-normal opacity-75">
                    {artwork.artist.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
