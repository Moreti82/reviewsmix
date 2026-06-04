import { PostCard } from "@/components/blog/post-card";
import { HeroSection } from "@/components/home/hero-section";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/layout/section-header";
import { getCategories, getFeaturedPosts } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();
  const categories = await getCategories();

  return (
    <>
      <HeroSection categories={categories} />

      {featuredPosts.length > 0 ? (
        <section className="py-16 md:py-24">
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
    </>
  );
}
