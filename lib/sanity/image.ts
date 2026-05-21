import { createImageUrlBuilder } from "@sanity/image-url";

import type { SanityImage } from "./types";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export function getImageUrl(
  image?: SanityImage,
  width = 800,
  height = 450
): string | null {
  if (!image?.asset) return null;

  return urlFor(image).width(width).height(height).fit("crop").auto("format").url();
}

export function getOgImageUrl(image?: SanityImage): string | null {
  return getImageUrl(image, 1200, 630);
}
