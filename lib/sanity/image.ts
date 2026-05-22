import { createImageUrlBuilder } from "@sanity/image-url";

import type { SanityImage } from "./types";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export function hasImageAsset(image?: SanityImage): boolean {
  return Boolean(image?.asset?._ref || image?.asset?._id || image?.asset?.url);
}

/** Remove entradas vazias e imagens duplicadas (mesmo asset). */
export function uniqueProductImages(images?: SanityImage[]): SanityImage[] {
  if (!images?.length) return [];

  const seen = new Set<string>();
  return images.filter((image) => {
    if (!hasImageAsset(image)) return false;
    const id =
      image.asset?._ref ?? image.asset?._id ?? image.asset?.url ?? "";
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export function getImageUrl(
  image?: SanityImage,
  width = 800,
  height = 450
): string | null {
  if (!hasImageAsset(image)) return null;
  return urlFor(image!).width(width).height(height).fit("max").auto("format").url();
}

/** Returns the original image URL with no dimension or crop constraints. */
export function getFullImageUrl(image?: SanityImage): string | null {
  if (!hasImageAsset(image)) return null;
  return urlFor(image!).auto("format").url();
}

export function getOgImageUrl(image?: SanityImage): string | null {
  return getImageUrl(image, 1200, 630);
}
