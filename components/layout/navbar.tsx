import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { NavbarSearch } from "@/components/layout/navbar-search";
import { PageShell } from "@/components/layout/page-shell";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/categoria", label: "Categorias" },
  { href: "/produto", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <PageShell wide className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 rounded-md border border-slate-200 bg-slate-50 p-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-primary hover:shadow-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <NavbarSearch />
      </PageShell>

      <div className="border-t border-slate-100 bg-white/95 lg:hidden">
        <PageShell wide className="flex flex-wrap justify-center gap-1 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2.5 py-1.5 text-center text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </PageShell>
      </div>
    </header>
  );
}
