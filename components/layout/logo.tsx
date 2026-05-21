import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight",
        className
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.55_0.2_290)] text-primary-foreground shadow-md shadow-primary/30 transition-transform group-hover:scale-105",
          inverted && "from-white to-white/80 text-primary"
        )}
      >
        <Sparkles className="size-4" />
      </span>
      <span className={cn(inverted ? "text-white" : "text-foreground")}>
        Reviews
        <span className={cn(inverted ? "text-white/80" : "text-gradient")}>
          Mix
        </span>
      </span>
    </Link>
  );
}
