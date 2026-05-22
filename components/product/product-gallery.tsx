"use client";

import { useState } from "react";
import Image from "next/image";

import { getImageUrl } from "@/lib/sanity/image";
import { SanityImage } from "@/components/shared/sanity-image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: SanityImageType[];
  productName: string;
  fallbackSeed: string;
};

const mainImageSize = { width: 1200, height: 900 };

function thumbnailSrc(
  image: SanityImageType,
  fallbackSeed: string,
  idx: number
): string {
  return (
    getImageUrl(image, 160, 160) ??
    image.asset?.url ??
    `https://picsum.photos/seed/${encodeURIComponent(fallbackSeed)}-${idx}/160/160`
  );
}

export function ProductGallery({
  images,
  productName,
  fallbackSeed,
}: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) {
    return (
      <section
        aria-label={`Fotos de ${productName}`}
        className="product-gallery mb-8 mx-auto w-full max-w-4xl"
      >
        <SanityImage
          alt={productName}
          fallbackSeed={fallbackSeed}
          aspect="product"
          {...mainImageSize}
        />
      </section>
    );
  }

  const safeIdx =
    activeIdx >= 0 && activeIdx < images.length ? activeIdx : 0;
  const activeImage = images[safeIdx] ?? images[0];
  const activeKey =
    activeImage.asset?._id ??
    activeImage.asset?._ref ??
    activeImage._key ??
    String(safeIdx);

  return (
    <section
      aria-label={`Fotos de ${productName}`}
      className="product-gallery mb-8 mx-auto flex w-full max-w-4xl flex-col items-center"
    >
      {/* Imagem principal — uma por vez */}
      <div className="w-full min-h-[280px] sm:min-h-[360px]">
        <SanityImage
          key={activeKey}
          image={activeImage}
          alt={`${productName} - Imagem ${safeIdx + 1} de ${images.length}`}
          fallbackSeed={`${fallbackSeed}-${safeIdx}`}
          aspect="product"
          priority={safeIdx === 0}
          {...mainImageSize}
        />
      </div>

      {/* Miniaturas para trocar a foto */}
      {images.length > 1 ? (
        <div
          role="tablist"
          aria-label="Selecionar foto do produto"
          className="mt-6 flex max-w-full flex-wrap justify-center gap-3 px-2"
        >
          {images.map((img, idx) => {
            const isActive = safeIdx === idx;
            const thumbKey =
              img._key ?? img.asset?._id ?? img.asset?._ref ?? idx;

            return (
              <button
                key={thumbKey}
                type="button"
                role="tab"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 outline-none transition-all duration-200 sm:h-24 sm:w-24",
                  isActive
                    ? "scale-105 border-indigo-600 shadow-lg ring-2 ring-indigo-500/30"
                    : "border-slate-200 hover:border-indigo-400 hover:shadow-md"
                )}
                aria-label={`Foto ${idx + 1} de ${images.length}`}
                aria-selected={isActive}
              >
                <Image
                  src={thumbnailSrc(img, fallbackSeed, idx)}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
