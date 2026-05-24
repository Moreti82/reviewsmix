import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page-shell";
import { RatingBadge } from "@/components/product/rating-badge";
import { SanityImage } from "@/components/shared/sanity-image";
import type { Post } from "@/lib/sanity/types";

const stats = [
  { icon: Star, label: "Reviews imparciais", value: "Nota editorial" },
  { icon: ShieldCheck, label: "Links verificados", value: "Lojas confiáveis" },
  { icon: Zap, label: "Atualizado", value: "Conteúdo 2026" },
];

type HeroSectionProps = {
  featuredPost?: Post;
};

export function HeroSection({ featuredPost }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-hero">
      <div className="absolute inset-0 bg-mesh" />

      <PageShell wide className="relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span className="size-2 rounded-full bg-orange-500" />
            Reviews profissionais
          </span>

          <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] md:text-6xl lg:text-7xl">
            ReviewsMix
          </h1>

          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-600 md:text-2xl">
            Análises claras, comparativos objetivos e links transparentes para
            você comprar melhor, sem perder tempo com promessa vazia.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-12 rounded-md px-7 text-base shadow-xl shadow-teal-700/20"
              asChild
            >
              <Link href="/produto">
                Explorar produtos
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-slate-300 bg-white px-7 text-base text-slate-800 hover:bg-slate-50"
              asChild
            >
              <Link href="/blog">Ler reviews</Link>
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="surface-card flex items-start gap-3 px-4 py-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-teal-50 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950">{value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={featuredPost ? `/blog/${featuredPost.slug}` : "/blog"}
          className="group surface-card relative block overflow-hidden p-3"
        >
          <SanityImage
            image={featuredPost?.coverImage}
            alt={featuredPost?.title ?? "Review em destaque"}
            aspect="hero"
            fallbackSeed={featuredPost?.slug ?? "reviewsmix-home"}
            priority
            containerClassName="shadow-none"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-lg border border-white/70 bg-white/95 p-5 shadow-xl shadow-slate-900/10 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
                <CheckCircle2 className="size-3.5" />
                Review destacado
              </span>
              {featuredPost?.rating != null ? (
                <RatingBadge rating={featuredPost.rating} size="sm" />
              ) : null}
            </div>
            <h2 className="mt-3 line-clamp-2 text-xl font-extrabold leading-tight text-slate-950">
              {featuredPost?.title ?? "Guias práticos para escolher produtos com segurança"}
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Abrir análise
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </p>
          </div>
        </Link>
      </PageShell>
    </section>
  );
}
