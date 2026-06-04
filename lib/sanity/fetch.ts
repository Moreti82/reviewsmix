import { isSanityConfigured, sanityClient } from "./client";
import { mockPosts } from "./mock-data";
import {
  featuredPostsQuery,
  postBySlugQuery,
  postsQuery,
  searchPostsQuery,
} from "./queries";
import type { Post } from "./types";

type FetchResult<T> = { data: T | null; ok: boolean };

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string> = {}
): Promise<FetchResult<T>> {
  if (!isSanityConfigured) return { data: null, ok: false };
  try {
    const data = await sanityClient.fetch<T>(query, params, {
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 60 },
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
  if (ok) return (data ?? []).slice(0, 4);
  return mockPosts.filter((p) => p.featured).slice(0, 4);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, ok } = await fetchFromSanity<Post>(postBySlugQuery, { slug });
  if (ok) return data ?? null;
  return mockPosts.find((p) => p.slug === slug) ?? null;
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

export async function searchContent(term: string): Promise<Post[]> {
  const normalized = term.trim();
  if (!normalized) return [];

  const postsResult = await fetchFromSanity<Post[]>(searchPostsQuery, {
    term: normalized,
  });

  return postsResult.ok ? (postsResult.data ?? []) : searchMockPosts(normalized);
}

export { isSanityConfigured };
