import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { searchContent } from "@/lib/sanity/fetch";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Busca",
  description: "Encontre reviews no ReviewsMix.",
};

export default async function BuscaPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const posts = term ? await searchContent(term) : [];

  const hasResults = posts.length > 0;

  return (
    <section className="border-b border-indigo-100 bg-hero py-16 md:py-20">
      <PageShell wide>
        <PageHeader
          eyebrow="Busca"
          title={term ? `Resultados para “${term}”` : "Buscar"}
          description={
            term
              ? `${posts.length} resultado(s) encontrado(s).`
              : "Digite um termo na barra de busca para encontrar reviews."
          }
        />

        {!term ? (
          <EmptyState
            title="O que você procura?"
            description="Use Ctrl+K (ou ⌘K) na navbar ou digite na URL: /busca?q=fone"
          />
        ) : null}

        {term && !hasResults ? (
          <EmptyState
            title="Nenhum resultado"
            description={`Não encontramos conteúdo para “${term}”. Tente outro termo.`}
          />
        ) : null}

        {posts.length > 0 ? (
          <section>
            <h2 className="mb-8 text-center text-xl font-bold">Reviews</h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        ) : null}
      </PageShell>
    </section>
  );
}
