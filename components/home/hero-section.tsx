import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page-shell";

const stats = [
  { icon: Star, label: "Reviews imparciais", value: "Nota editorial" },
  { icon: ShieldCheck, label: "Links verificados", value: "Lojas confiáveis" },
  { icon: Zap, label: "Atualizado", value: "Conteúdo 2026" },
];

export function HeroSection() {
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
            Descubra os{" "}
            <span className="text-gradient">melhores produtos</span> antes de
            comprar
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Análises completas, comparativos honestos e links diretos para
            comprar com transparência.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 rounded-full px-8 text-base shadow-xl shadow-indigo-500/30"
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
              className="h-12 rounded-full border-indigo-200 bg-white px-8 text-base text-indigo-700 hover:bg-indigo-50"
              asChild
            >
              <Link href="/blog">Ler reviews</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="surface-card flex flex-col items-center rounded-2xl px-5 py-6 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Icon className="size-6" />
              </div>
              <p className="mt-4 text-sm font-bold text-slate-900">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </PageShell>
    </section>
  );
}
