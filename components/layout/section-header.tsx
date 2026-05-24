import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  label,
  title,
  description,
  href,
  linkLabel = "Ver todos",
  className,
  align = "center",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6",
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between sm:text-left",
        className
      )}
    >
      <div className={cn(centered ? "max-w-2xl" : "max-w-2xl flex-1")}>
        {label ? <p className="section-label mb-3">{label}</p> : null}
        <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
        {description ? (
          <p className="rich-text mt-4 text-base text-slate-600 md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition-all hover:bg-teal-800"
        >
          {linkLabel}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
