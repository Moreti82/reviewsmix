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

export function getImageUrl(
  image?: SanityImage,
  width = 800,
  height?: number
): string | null {
  if (!hasImageAsset(image)) return null;
  let imageBuilder = urlFor(image!).width(width);
  if (height !== undefined) {
    imageBuilder = imageBuilder.height(height);
  }
  return imageBuilder.fit("max").auto("format").url();
}

/** Returns the original image URL with no dimension or crop constraints. */
export function getFullImageUrl(image?: SanityImage): string | null {
  if (!hasImageAsset(image)) return null;
  return urlFor(image!).auto("format").url();
}

export function getOgImageUrl(image?: SanityImage): string | null {
  return getImageUrl(image, 1200, 630);
}
