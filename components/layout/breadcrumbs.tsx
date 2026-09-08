import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  align?: "center" | "left";
};

export function Breadcrumbs({ items, align = "center" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-8 text-sm text-slate-500",
        align === "center" && "flex justify-center"
      )}
    >
      <ol className="flex flex-wrap items-center justify-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 opacity-40" />
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-indigo-600">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && "font-medium text-slate-800")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
