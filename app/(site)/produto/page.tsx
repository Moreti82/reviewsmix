import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getProducts } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Fichas de produtos com especificações e links para compra.",
};

export default async function ProdutosPage() {
  const products = await getProducts();

  return (
    <section className="border-b border-indigo-100 bg-hero py-16 md:py-20">
      <PageShell wide>
        <PageHeader
          eyebrow="Catálogo"
          title="Produtos"
          description="Especificações, notas e links para comprar nas lojas parceiras."
        />

        {products.length > 0 ? (
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum produto cadastrado"
            description="Adicione produtos no CMS em /studio."
          />
        )}
      </PageShell>
    </section>
  );
}
