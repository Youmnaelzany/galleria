"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageViewerProps {
  imageUrl: string;
  alt: string;
  title: string;
  artist: string;
  className?: string;
}

export default function ImageViewer({
  imageUrl,
  alt,
  title,
  artist,
  className = "",
}: ImageViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className={`group relative ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority
        className="object-cover"
      />
      <button
        onClick={toggleModal}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white/80 px-6 py-2 text-sm font-bold uppercase tracking-widest text-black opacity-0 transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
      >
        View Image
      </button>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={toggleModal}
        >
          <button
            className="absolute right-8 top-8 text-2xl text-white"
            onClick={(e) => {
              e.stopPropagation();
              toggleModal();
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="relative h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 75vw"
              className="object-contain"
              priority
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-md bg-black/50 px-4 py-2 text-white">
              {title} by {artist}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
