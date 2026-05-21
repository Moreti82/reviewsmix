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

  const [heroPost, ...otherFeatured] = featuredPosts;

  return (
    <>
      <HeroSection />

      {featuredPosts.length > 0 ? (
        <section className="py-16 md:py-24">
          <PageShell wide>
            <SectionHeader
              label="Destaques"
              title="Reviews em destaque"
              description="As análises mais recentes e recomendadas pela nossa equipe editorial."
              href="/blog"
            />

            {heroPost ? (
              <div className="mb-8">
                <PostCard post={heroPost} featured />
              </div>
            ) : null}

            {otherFeatured.length > 0 ? (
              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                {otherFeatured.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : null}
          </PageShell>
        </section>
      ) : null}

      {categories.length > 0 ? (
        <section className="border-y border-indigo-100 bg-white py-16 md:py-24">
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

      <section className="py-16 md:py-24">
        <PageShell wide>
          <div className="surface-card relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-10 text-center md:p-14">
              <p className="section-label mb-4">Pronto para comprar?</p>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Compare, leia e compre com confiança
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-slate-600">
                Cada review inclui prós, contras, nota editorial e links diretos
                para as lojas — com total transparência sobre afiliados.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/produto"
                  className="inline-flex h-12 items-center rounded-full bg-indigo-600 px-8 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 transition-all hover:bg-indigo-700"
                >
                  Ver catálogo de produtos
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex h-12 items-center rounded-full border-2 border-indigo-200 bg-white px-8 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-50"
                >
                  Nossa metodologia
                </Link>
              </div>
          </div>
        </PageShell>
      </section>
    </>
  );
}
