"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface GalleryNavigationProps {
  currentIndex: number;
  totalItems: number;
  artworkName: string;
  artistName: string;
  galleryData: Array<{ slug: string }>;
}

export default function GalleryNavigation({
  currentIndex,
  totalItems,
  artworkName,
  artistName,
  galleryData,
}: GalleryNavigationProps) {
  const router = useRouter();
  const progress = ((currentIndex + 1) / totalItems) * 100;

  const handleNavigation = (direction: "prev" | "next") => {
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % galleryData.length;
    } else {
      newIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    }
    router.push(`/galleria/${galleryData[newIndex].slug}`);
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">{artworkName}</h3>
              <p className="text-sm text-gray-500">{artistName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleNavigation("prev")}
                aria-label="Previous artwork"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleNavigation("next")}
                aria-label="Next artwork"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="h-1.5" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(totalItems).padStart(2, "0")}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
