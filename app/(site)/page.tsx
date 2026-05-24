import Link from "next/link";

import { PostCard } from "@/components/blog/post-card";
import { CategoryCard } from "@/components/category/category-card";
import { HeroSection } from "@/components/home/hero-section";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/layout/section-header";
import {
  getCategories,
  getFeaturedPosts,
} from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [featuredPosts, categories] = await Promise.all([
    getFeaturedPosts(),
    getCategories(),
  ]);

  return (
    <>
      <HeroSection featuredPost={featuredPosts[0]} />

      {featuredPosts.length > 0 ? (
        <section className="bg-white py-16 md:py-24">
          <PageShell wide>
            <SectionHeader
              label="Destaques"
              title="Reviews em destaque"
              description="As análises mais recentes e recomendadas pela nossa equipe editorial."
              href="/blog"
            />

            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPosts.map((post) => (
                <PostCard key={post._id} post={post} aspect="square" />
              ))}
            </div>
          </PageShell>
        </section>
      ) : null}

      {categories.length > 0 ? (
        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-24">
          <PageShell wide>
            <SectionHeader
              label="Explorar"
              title="Categorias"
              description="Encontre reviews e produtos organizados por tema."
              href="/categoria"
            />
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </PageShell>
        </section>
      ) : null}

      <section className="bg-white py-16 md:py-24">
        <PageShell wide>
          <div className="surface-card relative mx-auto max-w-5xl overflow-hidden p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="section-label mb-4">Pronto para comprar?</p>
                <h2 className="max-w-2xl text-3xl font-extrabold md:text-4xl">
                  Compare, leia e compre com confiança
                </h2>
                <p className="rich-text mt-5 max-w-2xl text-slate-600">
                  Cada review inclui prós, contras, nota editorial e links
                  diretos para as lojas, com transparência sobre afiliados.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <Link
                  href="/produto"
                  className="inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-bold text-white shadow-xl shadow-teal-700/20 transition-all hover:bg-teal-800"
                >
                  Ver catálogo
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex h-12 items-center rounded-md border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  Metodologia
                </Link>
              </div>
            </div>
          </div>
        </PageShell>
      </section>
    </>
  );
}
