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
  amazon: "hover:border-amber-400/50 hover:bg-amber-50 hover:text-amber-900",
  mercadolivre: "hover:border-sky-400/50 hover:bg-sky-50 hover:text-sky-900",
  shopee: "hover:border-orange-400/50 hover:bg-orange-50 hover:text-orange-900",
  instagram: "hover:border-pink-400/50 hover:bg-pink-50 hover:text-pink-900",
  whatsapp: "hover:border-emerald-400/50 hover:bg-emerald-50 hover:text-emerald-900",
  site: "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
  other: "hover:border-border hover:bg-muted",
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
        "surface-card overflow-hidden p-0 shadow-lg shadow-primary/5",
        className
      )}
    >
      <div className="border-b border-border/60 bg-gradient-to-r from-primary/10 via-transparent to-transparent px-6 py-5">
        <h2 className="text-lg font-bold">Onde comprar</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Links verificados pela nossa equipe. Preços podem variar.
        </p>
      </div>

      <div className="flex flex-col gap-3 p-6">
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
              "inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border/70 bg-background px-4 py-3 text-sm font-semibold transition-all",
              platformStyles[link.platform],
              index === 0 && "ring-2 ring-primary/20"
            )}
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <PlatformIcon platform={link.platform} />
              </span>
              {link.label}
            </span>
            <ExternalLink className="size-4 opacity-40" />
            <span className="sr-only">({platformLabels[link.platform]})</span>
          </a>
        ))}
      </div>

      <p className="border-t border-border/60 px-6 py-4 text-xs leading-relaxed text-muted-foreground">
        Podemos receber comissão por compras via links de afiliado, sem custo
        extra para você.
      </p>
    </section>
  );
}
