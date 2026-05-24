"use client";

import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function NavbarSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/busca?q=${encodeURIComponent(q)}`);
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar"
        className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-teal-200 hover:text-primary"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Buscar</span>
        <kbd className="hidden rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 md:inline">
          Ctrl K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-x-4 top-24 z-[70] mx-auto max-w-xl transition-all duration-200 md:inset-x-auto md:right-6 md:left-auto",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-lg border border-border/70 bg-background shadow-2xl shadow-primary/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-5">
            <Search className="size-5 shrink-0 text-primary" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar reviews e produtos..."
              className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Fechar busca"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="border-t border-border/60 bg-muted/30 px-5 py-3 text-xs text-muted-foreground">
            <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">
              Enter
            </kbd>{" "}
            buscar ·{" "}
            <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">
              Esc
            </kbd>{" "}
            fechar
          </div>
        </form>
      </div>
    </>
  );
}
