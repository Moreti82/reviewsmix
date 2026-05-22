"use client";

import { useState } from "react";
import Image from "next/image";

import { getImageUrl } from "@/lib/sanity/image";
import { SanityImage } from "@/components/shared/sanity-image";
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
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <SanityImage
        alt={productName}
        fallbackSeed={fallbackSeed}
        aspect="product"
        containerClassName="mb-8"
      />
    );
  }

  const activeImage = images[activeIdx] || images[0];

  return (
    <div className="mb-8 flex flex-col items-center">
      {/* Imagem Principal */}
      <div className="w-full max-w-lg">
        <SanityImage
          image={activeImage}
          alt={`${productName} - Imagem ${activeIdx + 1}`}
          fallbackSeed={`${fallbackSeed}-${activeIdx}`}
          aspect="product"
        />
      </div>

      {/* Miniaturas (Thumbnails) */}
      {images.length > 1 ? (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {images.map((img, idx) => {
            const thumbUrl =
              getImageUrl(img, 160, 160) ??
              `https://picsum.photos/seed/${encodeURIComponent(fallbackSeed)}-${idx}/160/160`;

            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={cn(
                  "relative overflow-hidden rounded-xl border bg-white p-1 transition-all duration-200 outline-none w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center",
                  activeIdx === idx
                    ? "border-indigo-600 ring-2 ring-indigo-500/20 shadow-md scale-105"
                    : "border-slate-300 hover:border-slate-500 hover:scale-102"
                )}
                aria-label={`Visualizar imagem ${idx + 1} de ${productName}`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={thumbUrl}
                    alt={`${productName} miniatura ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-0.5 rounded-lg"
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
