type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function articleJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt?: string;
  rating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "ReviewsMix",
      url: siteUrl,
    },
    ...(post.rating != null
      ? {
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: post.rating,
              bestRating: 10,
              worstRating: 0,
            },
            author: { "@type": "Organization", name: "ReviewsMix" },
          },
        }
      : {}),
  };
}

export function productJsonLd(product: {
  name: string;
  slug: string;
  shortDescription?: string;
  brand?: string;
  rating?: number;
  priceRange?: string;
  purchaseLinks?: { url: string; label: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    url: `${siteUrl}/produto/${product.slug}`,
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.rating != null
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            bestRating: 10,
            worstRating: 0,
            ratingCount: 1,
          },
        }
      : {}),
    ...(product.purchaseLinks?.length
      ? {
          offers: product.purchaseLinks.map((link) => ({
            "@type": "Offer",
            url: link.url,
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: link.label },
          })),
        }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ReviewsMix",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/busca?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
