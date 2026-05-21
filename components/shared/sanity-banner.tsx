import Link from "next/link";
import { Database, ExternalLink } from "lucide-react";

import { isSanityConfigured } from "@/sanity/env";

export function SanityBanner() {
  if (isSanityConfigured) return null;

  return (
    <div className="border-b border-amber-300/60 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 text-sm text-amber-950">
      <div className="site-container flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-medium">
          <Database className="size-4 shrink-0" />
          CMS não conectado — usando dados de demonstração.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-amber-900"
          >
            Criar projeto Sanity
            <ExternalLink className="size-3.5" />
          </Link>
          <span className="hidden text-amber-700 sm:inline">→</span>
          <code className="rounded bg-amber-100 px-2 py-0.5 text-xs">
            npm run sanity:connect
          </code>
        </div>
      </div>
    </div>
  );
}
