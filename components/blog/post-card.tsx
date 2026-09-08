import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { RatingBadge } from "@/components/blog/rating-badge";
import { SanityImage } from "@/components/shared/sanity-image";
import type { Post } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

type PostCardProps = {
  post: Post;
  featured?: boolean;
  aspect?: "video" | "square" | "wide" | "hero";
};

export function PostCard({ post, featured = false, aspect }: PostCardProps) {
  return (
    <article
      className={cn(
        "group surface-card surface-card-hover flex h-full flex-col overflow-hidden",
        featured && "lg:flex-row lg:items-stretch"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn("relative block shrink-0 flex flex-col", featured ? "lg:w-[42%] lg:min-h-full" : "")}
      >
        <SanityImage
          image={post.coverImage}
          alt={post.title}
          aspect={aspect ?? (featured ? "hero" : "video")}
          fallbackSeed={post.slug}
          containerClassName="h-full w-full"
        />
        {post.rating != null ? (
          <div className="absolute right-4 top-4 z-10">
            <RatingBadge rating={post.rating} size="sm" />
          </div>
        ) : null}
      </Link>

      <div
        className={cn(
          "flex flex-1 flex-col p-6 lg:p-7",
          featured && "lg:justify-center"
        )}
      >
        <h3
          className={cn(
            "font-bold leading-snug text-slate-900",
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-indigo-600"
          >
            {post.title}
          </Link>
        </h3>

        <p className="rich-text mt-3 line-clamp-3 flex-1 text-sm text-slate-600">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500">
          <div className="flex flex-wrap gap-3">
            {post.publishedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            ) : null}
            {post.readingTime ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readingTime} min
              </span>
            ) : null}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="font-bold text-indigo-600 hover:underline"
          >
            Ler review →
          </Link>
        </div>
      </div>
    </article>
  );
}
