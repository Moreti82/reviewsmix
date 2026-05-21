import { isSanityConfigured, sanityClient } from "./client";
import {
  mockCategories,
  mockPosts,
  mockProducts,
} from "./mock-data";
import {
  categoriesQuery,
  categoryBySlugQuery,
  featuredPostsQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  postsQuery,
  productBySlugQuery,
  productsByCategoryQuery,
  productsQuery,
  searchPostsQuery,
  searchProductsQuery,
} from "./queries";
import type { Category, Post, Product } from "./types";

type FetchResult<T> = { data: T | null; ok: boolean };

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string> = {}
): Promise<FetchResult<T>> {
  if (!isSanityConfigured) return { data: null, ok: false };
  try {
    const data = await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    return { data, ok: true };
  } catch (error) {
    console.error("[Sanity]", error);
    return { data: null, ok: false };
  }
}

export async function getPosts(): Promise<Post[]> {
  const { data, ok } = await fetchFromSanity<Post[]>(postsQuery);
  if (ok) return data ?? [];
  return mockPosts;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const { data, ok } = await fetchFromSanity<Post[]>(featuredPostsQuery);
  if (ok) return (data ?? []).slice(0, 3);
  return mockPosts.filter((p) => p.featured).slice(0, 3);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, ok } = await fetchFromSanity<Post>(postBySlugQuery, { slug });
  if (ok) return data ?? null;
  return mockPosts.find((p) => p.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  const { data, ok } = await fetchFromSanity<Product[]>(productsQuery);
  if (ok) return data ?? [];
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, ok } = await fetchFromSanity<Product>(productBySlugQuery, {
    slug,
  });
  if (ok) return data ?? null;
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const { data, ok } = await fetchFromSanity<Category[]>(categoriesQuery);
  if (ok) return data ?? [];
  return mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, ok } = await fetchFromSanity<Category>(categoryBySlugQuery, {
    slug,
  });
  if (ok) return data ?? null;
  return mockCategories.find((c) => c.slug === slug) ?? null;
}

export async function getPostsByCategory(slug: string): Promise<Post[]> {
  const { data, ok } = await fetchFromSanity<Post[]>(postsByCategoryQuery, {
    slug,
  });
  if (ok) return data ?? [];
  return mockPosts.filter((p) => p.category?.slug === slug);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const { data, ok } = await fetchFromSanity<Product[]>(
    productsByCategoryQuery,
    { slug }
  );
  if (ok) return data ?? [];
  return mockProducts.filter((p) => p.category?.slug === slug);
}

function normalizeSearchTerm(term: string) {
  return term.trim().toLowerCase();
}

function searchMockPosts(term: string): Post[] {
  const q = normalizeSearchTerm(term);
  if (!q) return [];
  return mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q)
  );
}

function searchMockProducts(term: string): Product[] {
  const q = normalizeSearchTerm(term);
  if (!q) return [];
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(q) ||
      product.shortDescription?.toLowerCase().includes(q) ||
      product.brand?.toLowerCase().includes(q)
  );
}

export async function searchContent(term: string): Promise<{
  posts: Post[];
  products: Product[];
}> {
  const normalized = term.trim();
  if (!normalized) return { posts: [], products: [] };

  const [postsResult, productsResult] = await Promise.all([
    fetchFromSanity<Post[]>(searchPostsQuery, { term: normalized }),
    fetchFromSanity<Product[]>(searchProductsQuery, { term: normalized }),
  ]);

  return {
    posts: postsResult.ok
      ? (postsResult.data ?? [])
      : searchMockPosts(normalized),
    products: productsResult.ok
      ? (productsResult.data ?? [])
      : searchMockProducts(normalized),
  };
}

export { isSanityConfigured };
