import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _key?: string;
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
  pros?: string[];
  cons?: string[];
  verdict?: string;
  rating?: number;
  readingTime?: number;
  publishedAt?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};
