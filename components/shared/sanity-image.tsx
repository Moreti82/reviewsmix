import Image from "next/image";

import { getImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type SanityImageProps = {
  image?: SanityImage;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackSeed?: string;
  aspect?: "video" | "square" | "wide" | "hero" | "product";
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
}: SanityImageProps) {
  const sizes = aspectSizes[aspect];
  const w = width ?? sizes.w;
  const h = height ?? sizes.h;
  const src =
    getImageUrl(image, w, h) ?? placeholderUrl(fallbackSeed, w, h);

  return (
    <div
      className={cn(
        "img-frame relative w-full bg-gradient-to-br from-indigo-100 to-violet-50",
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
        className={cn("object-cover object-center", className)}
      />
    </div>
  );
}
