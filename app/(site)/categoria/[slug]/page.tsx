import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/post-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ProductCard } from "@/components/product/product-card";
import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getProductsByCategory,
} from "@/lib/sanity/fetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [posts, products] = await Promise.all([
    getPostsByCategory(slug),
    getProductsByCategory(slug),
  ]);

  return (
    <section className="border-b border-slate-200 bg-hero py-16 md:py-20">
      <PageShell wide>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categorias", href: "/categoria" },
            { label: category.title },
          ]}
        />

        <PageHeader
          title={category.title}
          description={category.description}
        />

        {products.length > 0 ? (
          <section className="mb-16">
            <h2 className="mb-8 text-center text-xl font-bold">Produtos</h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
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

        {products.length === 0 && posts.length === 0 ? (
          <p className="text-center text-slate-500">
            Ainda não há conteúdo nesta categoria.
          </p>
        ) : null}
      </PageShell>
    </section>
  );
}
