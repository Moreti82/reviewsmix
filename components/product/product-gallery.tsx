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

const galleryContainerClass = "mb-8 w-full mx-auto";
const singleImageClass = "max-w-3xl";
const multiImageClass = "max-w-5xl gap-5";

export function ProductGallery({
  images = [],
  productName,
  fallbackSeed,
}: ProductGalleryProps) {
  const galleryImages = uniqueProductImages(images);

  const imageSize = { width: 1200, height: 900 };

  if (galleryImages.length === 0) {
    return (
      <div className={cn(galleryContainerClass, singleImageClass)}>
        <SanityImage
          alt={productName}
          fallbackSeed={fallbackSeed}
          aspect="product"
          {...imageSize}
        />
      </div>
    );
  }

  if (galleryImages.length === 1) {
    return (
      <div className={cn(galleryContainerClass, singleImageClass)}>
        <SanityImage
          image={galleryImages[0]}
          alt={productName}
          fallbackSeed={fallbackSeed}
          aspect="product"
          {...imageSize}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        galleryContainerClass,
        multiImageClass,
        "grid",
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
          {...imageSize}
        />
      ))}
    </div>
  );
}
