import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SanityImage } from "@/components/shared/sanity-image";
import { RatingBadge } from "@/components/product/rating-badge";
import type { Product } from "@/lib/sanity/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0];

  return (
    <article className="group surface-card surface-card-hover flex h-full flex-col">
      {/* Image with lightbox */}
      <div className="relative">
        <SanityImage
          image={image}
          alt={product.name}
          fallbackSeed={product.slug}
          aspect="product"
        />
        {product.rating != null ? (
          <div className="absolute right-4 top-4 z-10">
            <RatingBadge rating={product.rating} size="sm" />
          </div>
        ) : null}
        {product.priceRange ? (
          <span className="absolute bottom-4 left-4 z-10 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-slate-900 shadow-lg backdrop-blur-sm">
            {product.priceRange}
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 text-center lg:text-left">
        {product.brand ? (
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {product.brand}
          </p>
        ) : null}

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          <Link
            href={`/produto/${product.slug}`}
            className="transition-colors hover:text-indigo-600"
          >
            {product.name}
          </Link>
        </h3>

        {product.shortDescription ? (
          <p className="rich-text mt-3 line-clamp-4 flex-1 text-sm text-slate-600">
            {product.shortDescription}
          </p>
        ) : null}

        <div className="mt-5 flex justify-center lg:justify-end">
          <Link
            href={`/produto/${product.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/30"
          >
            Onde comprar
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
