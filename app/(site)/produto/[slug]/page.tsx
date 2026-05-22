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
import { SanityImage } from "@/components/shared/sanity-image";
import { getOgImageUrl } from "@/lib/sanity/image";
import {
  getPosts,
  getProductBySlug,
  getProducts,
} from "@/lib/sanity/fetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

  const mainImage = product.images?.[0];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <div className="py-12 md:py-16">
        <PageShell wide>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Produtos", href: "/produto" },
              { label: product.name },
            ]}
          />

          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <SanityImage
                image={mainImage}
                alt={product.name}
                fallbackSeed={product.slug}
                aspect="product"
                containerClassName="mb-8"
              />

              {product.brand ? (
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
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
                  className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:underline"
                >
                  {product.category.title}
                </Link>
              ) : null}

              {product.shortDescription ? (
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                  {product.shortDescription}
                </p>
              ) : null}

              {product.priceRange ? (
                <p className="mt-4 text-2xl font-extrabold text-slate-900">
                  {product.priceRange}
                </p>
              ) : null}
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-10 lg:grid-cols-5">
              {product.specs && product.specs.length > 0 ? (
                <section className="lg:col-span-3">
                  <h2 className="mb-5 text-center text-xl font-bold lg:text-left">
                    Especificações
                  </h2>
                  <SpecsTable specs={product.specs} />
                </section>
              ) : (
                <div className="lg:col-span-3" />
              )}

              <aside className="lg:col-span-2">
                {product.purchaseLinks && product.purchaseLinks.length > 0 ? (
                  <PurchaseLinks
                    links={product.purchaseLinks}
                    className="sticky top-24"
                  />
                ) : (
                  <div className="surface-card rounded-2xl border-dashed p-6 text-center text-sm text-slate-500">
                    Links de compra ainda não cadastrados.
                  </div>
                )}
              </aside>
            </div>
          </div>

          {relatedPosts.length > 0 ? (
            <section className="mx-auto mt-20 max-w-5xl border-t border-indigo-100 pt-16">
              <h2 className="text-center text-2xl font-extrabold">
                Reviews relacionados
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {relatedPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          ) : null}
        </PageShell>
      </div>
    </>
  );
}
