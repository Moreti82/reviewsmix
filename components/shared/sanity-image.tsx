"use client";

import Image from "next/image";

import { getImageUrl } from "@/lib/sanity/image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type SanityImageProps = {
  image?: SanityImageType;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackSeed?: string;
  aspect?: "video" | "square" | "wide" | "hero" | "product";
  objectFit?: "cover" | "contain";
};

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  hero: "aspect-[16/10]",
  product: "aspect-[4/3]",
};

const aspectSizes = {
  video: { w: 960, h: 540 },
  square: { w: 800, h: 800 },
  wide: { w: 1400, h: 600 },
  hero: { w: 1200, h: 750 },
  product: { w: 960, h: 720 },
};

function placeholderUrl(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  fallbackSeed = "reviewsmix",
  aspect = "video",
  objectFit,
}: SanityImageProps) {
  const sizes = aspectSizes[aspect];
  const w = width ?? sizes.w;
  const h = height ?? sizes.h;
  const src =
    getImageUrl(image, w, h) ?? placeholderUrl(fallbackSeed, w, h);

  // Por padrão, usamos contain para não cortar nenhuma imagem do site
  const fit = objectFit ?? "contain";

  // Product or explicit contain images: use explicit dimensions so the image is never clipped
  if (fit === "contain" && aspect === "product") {
    return (
      <div
        className={cn(
          "img-frame w-full bg-white border border-slate-100 p-2",
          containerClassName
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          priority={priority}
          className={cn("w-full h-auto object-contain", className)}
        />
      </div>
    );
  }

  // Cover images: use fill inside a fixed aspect-ratio container but with object-contain to avoid cropping
  return (
    <div
      className={cn(
        "img-frame relative w-full bg-white border border-slate-100 p-2",
        aspectClasses[aspect],
        containerClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        priority={priority}
        className={cn("object-contain object-center", className)}
      />
    </div>
  );
}

