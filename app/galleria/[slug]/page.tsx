import Image from "next/image";
import Link from "next/link";

// Import the data directly from the JSON file
import GalleryNavigation from "@/app/components/GalleryNavigation";
import data from "@/app/db/data.json";
import ImageViewer from "@/components/ImageViewer";

// Define TypeScript types for the data
interface Artist {
  name: string;
  image: string;
}

interface Artwork {
  slug: string;
  name: string;
  year: number;
  description: string;
  source: string;
  artist: Artist;
  images: {
    hero: {
      large: string;
      small?: string;
    };
    gallery?: string;
    thumbnail?: string;
  };
}

// Type assertion for the imported data
const galleryData = data as Artwork[];

// This generates the static paths for all artworks at build time
export async function generateStaticParams() {
  return galleryData.map((artwork) => ({
    slug: artwork.slug,
  }));
}

export default async function GalleriaPage({
  params,
}: {
  params: { slug: string };
}) {
  // In Next.js 13+ with App Router, params is a Promise that needs to be awaited
  const { slug } = await params;
  const currentIndex = galleryData.findIndex((item) => item.slug === slug);
  const artwork = galleryData[currentIndex];

  if (!artwork) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Artwork not found</h1>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            &larr; Back to gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to gallery
        </Link>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full">
          <ImageViewer
            imageUrl={artwork.images.hero.large}
            alt={artwork.name}
            title={artwork.name}
            artist={artwork.artist.name}
            className="h-full w-full"
          />
        </div>

        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="mb-2 text-4xl font-bold">{artwork.name}</h1>
            <p className="text-gray-600">{artwork.artist.name}</p>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={artwork.artist.image}
                alt={artwork.artist.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">{artwork.artist.name}</h3>
              <p className="text-sm text-gray-500">Artist</p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">Year</h3>
            <p>{artwork.year}</p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">About</h3>
            <p className="text-gray-700">{artwork.description}</p>
          </div>

          <div>
            <a
              href={artwork.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on Wikipedia &rarr;
            </a>
          </div>
        </div>
      </div>

      <GalleryNavigation
        currentIndex={currentIndex}
        totalItems={galleryData.length}
        artworkName={artwork.name}
        artistName={artwork.artist.name}
        galleryData={galleryData}
      />
    </div>
  );
}
