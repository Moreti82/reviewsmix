import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Gamepad2,
  Headphones,
  Home,
  Laptop,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page-shell";
import { getImageUrl } from "@/lib/sanity/image";
import type { Category } from "@/lib/sanity/types";

interface HeroSectionProps {
  categories: Category[];
}

function getFallbackIcon(title: string) {
  const normalized = title.toLowerCase();
  if (
    normalized.includes("celular") ||
    normalized.includes("phone") ||
    normalized.includes("smartphone")
  ) {
    return Smartphone;
  }
  if (
    normalized.includes("áudio") ||
    normalized.includes("som") ||
    normalized.includes("fone") ||
    normalized.includes("audio")
  ) {
    return Headphones;
  }
  if (
    normalized.includes("eletro") ||
    normalized.includes("cozinha") ||
    normalized.includes("casa")
  ) {
    return Home;
  }
  if (
    normalized.includes("inteligente") ||
    normalized.includes("smart") ||
    normalized.includes("tecnologia") ||
    normalized.includes("tech")
  ) {
    return Cpu;
  }
  if (
    normalized.includes("informática") ||
    normalized.includes("computador") ||
    normalized.includes("notebook") ||
    normalized.includes("pc")
  ) {
    return Laptop;
  }
  if (
    normalized.includes("gamer") ||
    normalized.includes("jogo") ||
    normalized.includes("console")
  ) {
    return Gamepad2;
  }
  if (
    normalized.includes("beleza") ||
    normalized.includes("saúde") ||
    normalized.includes("bem-estar") ||
    normalized.includes("cosmético")
  ) {
    return Sparkles;
  }
  return ShoppingBag;
}

export function HeroSection({ categories }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-indigo-100 bg-hero">
      <div className="absolute inset-0 bg-mesh" />

      <PageShell wide className="relative py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">
            <span className="size-2 animate-pulse rounded-full bg-indigo-500" />
            Reviews profissionais
          </span>

          <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl">
            Leia <span className="text-gradient">reviews completos</span> antes
            de decidir
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Análises completas, comparativos honestos e notas editoriais para
            ajudar você a escolher com confiança.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 rounded-full px-8 text-base shadow-xl shadow-indigo-500/30"
              asChild
            >
              <Link href="/blog">
                Ler reviews
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-indigo-200 bg-white px-8 text-base text-indigo-700 hover:bg-indigo-50"
              asChild
            >
              <Link href="/sobre">Nossa metodologia</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Compre por Categoria
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = getFallbackIcon(category.title);
              const iconUrl = getImageUrl(category.icon, 80, 80);

              return (
                <a
                  key={category._id}
                  href={category.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-100/80 p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 hover:border-violet-200 w-24 sm:w-28 min-h-[130px] sm:min-h-[140px] justify-center cursor-pointer"
                >
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-violet-50/80 border border-violet-100/80 text-violet-600 transition-all duration-300 group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:text-white group-hover:scale-105">
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={category.title}
                        className="size-9 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                      />
                    ) : (
                      <Icon className="size-8 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 leading-tight transition-colors duration-300 group-hover:text-violet-600 line-clamp-2 text-center">
                    {category.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </PageShell>
    </section>
  );
}
