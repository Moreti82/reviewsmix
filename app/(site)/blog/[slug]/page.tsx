import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock } from "lucide-react";

import { PostBody } from "@/components/blog/portable-text";
import { PostCard } from "@/components/blog/post-card";
import { ProsCons } from "@/components/blog/pros-cons";
import { RatingBadge } from "@/components/blog/rating-badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageShell } from "@/components/layout/page-shell";
import { articleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { SanityImage } from "@/components/shared/sanity-image";
import { getOgImageUrl } from "@/lib/sanity/image";
import { getPostBySlug, getPosts } from "@/lib/sanity/fetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Review não encontrado" };

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const ogImage = getOgImageUrl(post.coverImage);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />

      <article className="py-12 md:py-16">
        <PageShell wide>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            <SanityImage
              image={post.coverImage}
              alt={post.title}
              aspect="hero"
              fallbackSeed={post.slug}
              priority
              containerClassName="mb-10"
            />

            <header className="text-center">
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                {post.rating != null ? (
                  <RatingBadge rating={post.rating} size="lg" />
                ) : null}
              </div>
              <p className="rich-text mx-auto mt-5 max-w-2xl text-lg text-slate-600">
                {post.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                {post.publishedAt ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                ) : null}
                {post.readingTime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" />
                    {post.readingTime} min de leitura
                  </span>
                ) : null}
              </div>
            </header>

            <div className="mx-auto mt-12 max-w-3xl">
              <ProsCons pros={post.pros} cons={post.cons} />
              <div className="mt-10">
                <PostBody value={post.body} />
              </div>
              {post.verdict ? (
                <div className="mt-10 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-8">
                  <p className="section-label mb-3 text-center">Veredito</p>
                  <p className="rich-text text-lg text-slate-700">
                    {post.verdict}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {relatedPosts.length > 0 ? (
            <section className="mx-auto mt-20 max-w-5xl border-t border-indigo-100 pt-16">
              <h2 className="text-center text-2xl font-extrabold">
                Reviews relacionados
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <PostCard key={related._id} post={related} />
                ))}
              </div>
            </section>
          ) : null}
        </PageShell>
      </article>
    </>
  );
}
