import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { getPosts } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description: "Reviews, comparativos e guias de compra do ReviewsMix.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="border-b border-slate-200 bg-hero py-16 md:py-20">
      <PageShell wide>
        <PageHeader
          eyebrow="Reviews"
          title="Blog"
          description="Análises detalhadas para você decidir com confiança."
        />

        {posts.length > 0 ? (
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum review publicado"
            description="Publique artigos no CMS em /studio."
          />
        )}
      </PageShell>
    </section>
  );
}
