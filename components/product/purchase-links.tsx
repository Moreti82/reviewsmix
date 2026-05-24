import {
  ExternalLink,
  Globe,
  MessageCircle,
  Share2,
  ShoppingBag,
  Store,
} from "lucide-react";

import type { PurchaseLink, PurchasePlatform } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const platformLabels: Record<PurchasePlatform, string> = {
  amazon: "Amazon",
  mercadolivre: "Mercado Livre",
  shopee: "Shopee",
  site: "Site",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  other: "Loja",
};

const platformStyles: Record<PurchasePlatform, string> = {
  amazon: "hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900",
  mercadolivre: "hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900",
  shopee: "hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900",
  instagram: "hover:border-pink-300 hover:bg-pink-50 hover:text-pink-900",
  whatsapp: "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900",
  site: "hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900",
  other: "hover:border-slate-300 hover:bg-slate-50",
};

function PlatformIcon({ platform }: { platform: PurchasePlatform }) {
  const className = "size-4 shrink-0";
  switch (platform) {
    case "instagram":
      return <Share2 className={className} />;
    case "whatsapp":
      return <MessageCircle className={className} />;
    case "amazon":
    case "mercadolivre":
    case "shopee":
      return <ShoppingBag className={className} />;
    case "site":
      return <Store className={className} />;
    default:
      return <Globe className={className} />;
  }
}

type PurchaseLinksProps = {
  links: PurchaseLink[];
  className?: string;
};

export function PurchaseLinks({ links, className }: PurchaseLinksProps) {
  const sorted = [...links].sort(
    (a, b) => (a.priority ?? 0) - (b.priority ?? 0)
  );

  if (!sorted.length) return null;

  return (
    <section
      className={cn(
        "surface-card w-full max-w-[18rem] overflow-hidden bg-white p-0 shadow-md shadow-primary/5",
        className
      )}
    >
      <div className="border-b border-border/60 bg-gradient-to-r from-teal-50 via-white to-orange-50 px-5 py-4">
        <h2 className="text-lg font-extrabold">Onde comprar</h2>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          Links verificados. Preços podem variar.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 p-4">
        {sorted.map((link, index) => (
          <a
            key={`${link.url}-${link.label}`}
            href={link.url}
            target="_blank"
            rel={
              link.isAffiliate
                ? "noopener noreferrer sponsored"
                : "noopener noreferrer"
            }
            className={cn(
              "inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-md border border-border/80 bg-white px-3.5 py-3 text-sm font-bold text-slate-800 transition-all",
              platformStyles[link.platform],
              index === 0 && "ring-2 ring-primary/15"
            )}
          >
            <span className="inline-flex min-w-0 flex-1 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded bg-slate-100">
                <PlatformIcon platform={link.platform} />
              </span>
              <span className="truncate">{link.label}</span>
            </span>
            <ExternalLink className="size-4 shrink-0 opacity-45" />
            <span className="sr-only">({platformLabels[link.platform]})</span>
          </a>
        ))}
      </div>

      <p className="border-t border-border/60 px-5 py-3 text-xs leading-relaxed text-muted-foreground">
        Podemos receber comissão por compras via afiliado, sem custo extra para
        você.
      </p>
    </section>
  );
}
