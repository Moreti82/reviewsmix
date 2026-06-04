import Link from "next/link";
import { Search } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { NavbarSearch } from "@/components/layout/navbar-search";
import { PageShell } from "@/components/layout/page-shell";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-indigo-100/80 bg-white/90 shadow-sm shadow-indigo-500/5 backdrop-blur-xl">
      <PageShell wide className="flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50/50 p-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-indigo-700 hover:shadow-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/busca"
            className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-indigo-200 hover:text-indigo-700 sm:inline-flex"
          >
            <Search className="size-4" />
            <span>Buscar</span>
            <kbd className="hidden rounded-md bg-indigo-50 px-1.5 py-0.5 font-mono text-[10px] text-indigo-600 md:inline">
              ⌘K
            </kbd>
          </Link>
          <NavbarSearch />
        </div>
      </PageShell>
    </header>
  );
}
