"use client";

import { SanityImage } from "@/components/shared/sanity-image";
import { uniqueProductImages } from "@/lib/sanity/image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images?: SanityImageType[];
  productName: string;
  fallbackSeed: string;
};

export function ProductGallery({
  images = [],
  productName,
  fallbackSeed,
}: ProductGalleryProps) {
  const galleryImages = uniqueProductImages(images);

  if (galleryImages.length === 0) {
    return (
      <SanityImage
        alt={productName}
        fallbackSeed={fallbackSeed}
        aspect="product"
        containerClassName="mb-8"
      />
    );
  }

  if (galleryImages.length === 1) {
    return (
      <div className="mb-8 w-full max-w-lg mx-auto">
        <SanityImage
          image={galleryImages[0]}
          alt={productName}
          fallbackSeed={fallbackSeed}
          aspect="product"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-8 grid w-full max-w-3xl mx-auto gap-4",
        galleryImages.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {galleryImages.map((image, idx) => (
        <SanityImage
          key={image._key ?? image.asset?._id ?? image.asset?._ref ?? idx}
          image={image}
          alt={`${productName} - Imagem ${idx + 1}`}
          fallbackSeed={`${fallbackSeed}-${idx}`}
          aspect="product"
        />
      ))}
    </div>
  );
}
