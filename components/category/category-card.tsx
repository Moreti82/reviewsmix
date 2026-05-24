import Link from "next/link";
import { ArrowUpRight, Headphones, Home, Smartphone } from "lucide-react";

import type { Category } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof Headphones> = {
  audio: Headphones,
  smartphones: Smartphone,
  "casa-inteligente": Home,
};

const accents = [
  "bg-teal-600",
  "bg-blue-600",
  "bg-orange-500",
];

type CategoryCardProps = {
  category: Category;
  index?: number;
};

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const Icon = categoryIcons[category.slug] ?? ArrowUpRight;
  const accent = accents[index % accents.length];

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group surface-card surface-card-hover relative flex h-full flex-col items-center overflow-hidden bg-white p-8 text-center"
    >
      <div
        className={cn(
          "flex size-14 items-center justify-center rounded-md text-white shadow-lg transition-transform duration-300 group-hover:scale-105",
          accent
        )}
      >
        <Icon className="size-7" />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
        {category.title}
      </h3>

      {category.description ? (
        <p className="rich-text mt-3 line-clamp-2 text-sm text-slate-600">
          {category.description}
        </p>
      ) : null}

      <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary">
        Explorar
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
