"use client";

import { useState } from "react";
import Image from "next/image";

import { getImageUrl, uniqueProductImages } from "@/lib/sanity/image";
import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images?: SanityImageType[];
  productName: string;
  fallbackSeed: string;
};

const mainImageSize = { width: 1200, height: 900 };

export function ProductGallery({
  images = [],
  productName,
  fallbackSeed,
}: ProductGalleryProps) {
  const galleryImages = uniqueProductImages(images);
  const [activeIdx, setActiveIdx] = useState(0);

  if (galleryImages.length === 0) {
    return (
      <div className="mb-8 mx-auto w-full max-w-3xl">
        <SanityImage
          alt={productName}
          fallbackSeed={fallbackSeed}
          aspect="product"
          {...mainImageSize}
        />
      </div>
    );
  }

  const safeIdx =
    activeIdx >= 0 && activeIdx < galleryImages.length ? activeIdx : 0;
  const activeImage = galleryImages[safeIdx] ?? galleryImages[0];

  return (
    <div className="mb-8 mx-auto flex w-full max-w-3xl flex-col items-center">
      {/* Imagem principal */}
      <div className="w-full">
        <SanityImage
          image={activeImage}
          alt={`${productName} - Imagem ${safeIdx + 1}`}
          fallbackSeed={`${fallbackSeed}-${safeIdx}`}
          aspect="product"
          {...mainImageSize}
        />
      </div>

      {/* Miniaturas */}
      {galleryImages.length > 1 ? (
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {galleryImages.map((img, idx) => {
            const thumbUrl =
              getImageUrl(img, 160, 160) ??
              `https://picsum.photos/seed/${encodeURIComponent(fallbackSeed)}-${idx}/160/160`;

            return (
              <button
                key={img._key ?? img.asset?._id ?? img.asset?._ref ?? idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border bg-white p-1 outline-none transition-all duration-200 sm:h-20 sm:w-20",
                  safeIdx === idx
                    ? "scale-105 border-indigo-600 shadow-md ring-2 ring-indigo-500/20"
                    : "border-slate-300 hover:scale-[1.02] hover:border-slate-500"
                )}
                aria-label={`Visualizar imagem ${idx + 1} de ${productName}`}
                aria-pressed={safeIdx === idx}
              >
                <Image
                  src={thumbUrl}
                  alt={`${productName} miniatura ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="rounded-lg object-contain p-0.5"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
