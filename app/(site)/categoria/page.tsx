import type { Metadata } from "next";

import { CategoryCard } from "@/components/category/category-card";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { getCategories } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Explore produtos e reviews por categoria.",
};

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <section className="border-b border-indigo-100 bg-hero py-16 md:py-20">
      <PageShell wide>
        <PageHeader
          eyebrow="Navegação"
          title="Categorias"
          description="Encontre reviews e produtos organizados por tema."
        />

        {categories.length > 0 ? (
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard
                key={category._id}
                category={category}
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhuma categoria"
            description="Crie categorias no CMS em /studio."
          />
        )}
      </PageShell>
    </section>
  );
}
