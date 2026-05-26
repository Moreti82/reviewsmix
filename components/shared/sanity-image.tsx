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
  // Por padrão, usamos contain para não cortar nenhuma imagem do site
  const fit = objectFit ?? "contain";
  const sizes = aspectSizes[aspect];
  const w = width ?? sizes.w;
  const h = height ?? sizes.h;

  // Se o fit for "contain", não passamos a altura para o Sanity para evitar que ele corte a imagem no servidor.
  // Deixamos o navegador fazer o "contain" da imagem inteira.
  const sanityHeight = fit === "contain" ? undefined : h;

  const src = image
    ? (getImageUrl(image, w, sanityHeight) ?? placeholderUrl(fallbackSeed, w, h))
    : placeholderUrl(fallbackSeed, w, h);

  // Product or explicit contain images: use explicit dimensions inside a fixed aspect ratio container with generous padding to prevent clipping
  if (fit === "contain" && aspect === "product") {
    return (
      <div
        className={cn(
          "img-frame relative w-full aspect-[4/3] bg-white border border-slate-100 p-5 flex items-center justify-center",
          containerClassName
        )}
      >
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority={priority}
            className={cn("object-contain object-center", className)}
          />
        </div>
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

