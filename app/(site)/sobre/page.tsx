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
          description="Reviews independentes para ajudar você a comprar melhor."
        />

        <div className="surface-card space-y-8 rounded-2xl p-8 text-center md:p-10">
          <p className="rich-text text-slate-600">
            O ReviewsMix publica análises detalhadas de produtos, com prós, contras e
            links para lojas parceiras. Nosso objetivo é informar — não empurrar
            compras desnecessárias.
          </p>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Política de afiliados
            </h2>
            <p className="rich-text mt-3 text-slate-600">
              Alguns links neste site são de afiliado. Quando você compra através
              deles, podemos receber uma comissão sem custo extra para você. Isso
              ajuda a manter o site e não influencia nossa nota editorial.
            </p>
          </div>
        </div>
      </PageShell>
    </section>
  );
}
