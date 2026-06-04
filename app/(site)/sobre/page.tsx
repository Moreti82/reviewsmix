import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o ReviewsMix e nossa política de transparência.",
};

export default function SobrePage() {
  return (
    <section className="border-b border-indigo-100 bg-hero py-16 md:py-20">
      <PageShell narrow>
        <PageHeader
          title="Sobre o ReviewsMix"
          description="Reviews independentes para ajudar você a decidir melhor."
        />

        <div className="surface-card space-y-8 rounded-2xl p-8 text-center md:p-10">
          <p className="rich-text text-slate-600">
            O ReviewsMix publica análises detalhadas com prós, contras, notas e
            vereditos editoriais. Nosso objetivo é informar com clareza, contexto
            e independência.
          </p>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Política editorial
            </h2>
            <p className="rich-text mt-3 text-slate-600">
              As notas seguem critérios editoriais consistentes. Prós, contras e
              vereditos são apresentados para facilitar a leitura sem substituir a
              decisão final de quem acompanha o review.
            </p>
          </div>
        </div>
      </PageShell>
    </section>
  );
}
