import type { PortableTextBlock } from "@portabletext/types";

export type PurchasePlatform =
  | "amazon"
  | "mercadolivre"
  | "shopee"
  | "site"
  | "instagram"
  | "whatsapp"
  | "other";

export type PurchaseLink = {
  label: string;
  url: string;
  platform: PurchasePlatform;
  isAffiliate?: boolean;
  priority?: number;
};

export type SanityImage = {
  _key?: string;
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: SanityImage;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  brand?: string;
  shortDescription?: string;
  rating?: number;
  priceRange?: string;
  specs?: { key: string; value: string }[];
  purchaseLinks?: PurchaseLink[];
  category?: Pick<Category, "_id" | "title" | "slug">;
  images?: SanityImage[];
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
  category?: Pick<Category, "_id" | "title" | "slug">;
  products?: Product[];
};
