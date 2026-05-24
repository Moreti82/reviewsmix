import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/post-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageShell } from "@/components/layout/page-shell";
import { PurchaseLinks } from "@/components/product/purchase-links";
import { RatingBadge } from "@/components/product/rating-badge";
import { SpecsTable } from "@/components/product/specs-table";
import { JsonLd, productJsonLd } from "@/components/seo/json-ld";
import { ProductGallery } from "@/components/product/product-gallery";
import { getOgImageUrl, uniqueProductImages } from "@/lib/sanity/image";
import {
  getPosts,
  getProductBySlug,
  getProducts,
} from "@/lib/sanity/fetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Sempre busca imagens atualizadas do Sanity (evita HTML antigo em cache). */
export const revalidate = 0;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };

  const ogImage = getOgImageUrl(product.images?.[0]);

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter((post) =>
      post.products?.some(
        (p) => p._id === product._id || p.slug === product.slug
      )
    )
    .slice(0, 2);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <div className="bg-white py-12 md:py-16">
        <PageShell wide>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Produtos", href: "/produto" },
              { label: product.name },
            ]}
          />

          <header className="mx-auto mb-10 max-w-4xl text-center">
            {product.brand ? (
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                {product.brand}
              </p>
            ) : null}

            <div className="mt-3 flex flex-col items-center gap-4">
              <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              {product.rating != null ? (
                <RatingBadge rating={product.rating} size="lg" />
              ) : null}
            </div>

            {product.category ? (
              <Link
                href={`/categoria/${product.category.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
              >
                {product.category.title}
              </Link>
            ) : null}

            {product.shortDescription ? (
              <p className="rich-text mx-auto mt-5 max-w-2xl text-lg text-slate-600">
                {product.shortDescription}
              </p>
            ) : null}

            {product.priceRange ? (
              <p className="mt-4 text-2xl font-extrabold text-slate-900">
                {product.priceRange}
              </p>
            ) : null}
          </header>

          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-12">
            <div className="min-w-0 lg:col-span-9">
              <ProductGallery
                images={uniqueProductImages(product.images)}
                productName={product.name}
                fallbackSeed={product.slug}
              />
            </div>

            <aside className="mt-10 flex justify-center lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:justify-end">
              <div className="lg:sticky lg:top-24 lg:z-10 lg:w-full lg:max-w-[18rem]">
                {product.purchaseLinks && product.purchaseLinks.length > 0 ? (
                  <PurchaseLinks links={product.purchaseLinks} />
                ) : (
                  <div className="surface-card border-dashed p-6 text-center text-sm text-slate-500">
                    Links de compra ainda não cadastrados.
                  </div>
                )}
              </div>
            </aside>

            <div className="mt-12 space-y-12 lg:col-span-9 lg:row-start-2 lg:mt-0">
              {product.specs && product.specs.length > 0 ? (
                <section>
                  <h2 className="mb-5 text-center text-xl font-bold lg:text-left">
                    Especificações
                  </h2>
                  <SpecsTable specs={product.specs} />
                </section>
              ) : null}

              {relatedPosts.length > 0 ? (
                <section className="border-t border-slate-200 pt-16">
                  <h2 className="text-center text-2xl font-extrabold lg:text-left">
                    Reviews relacionados
                  </h2>
                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    {relatedPosts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </PageShell>
      </div>
    </>
  );
}
