import type { ReactNode } from "react";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { PageShell } from "@/components/layout/page-shell";

const footerLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/produto", label: "Produtos" },
  { href: "/categoria", label: "Categorias" },
  { href: "/busca", label: "Busca" },
  { href: "/sobre", label: "Sobre" },
];

const DEVFULLCODE_URL = "https://devfullcode.com";

function DevFullCodeLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={DEVFULLCODE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-indigo-900/20 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <PageShell wide className="py-16">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3 md:text-center lg:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Reviews e análises profissionais com links transparentes para
              compra.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              Navegação
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              Transparência
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Podemos receber comissão por compras via links de afiliado.{" "}
              <Link href="/sobre" className="text-indigo-300 hover:text-white">
                Saiba mais
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 sm:items-center text-center">
          <div className="hidden sm:block" />
          
          <p className="text-sm text-slate-500 sm:text-center">
            © {new Date().getFullYear()} ReviewsMix · Análises independentes
          </p>

          <div className="space-y-1 sm:text-right">
            <p className="text-sm text-slate-400">
              Site desenvolvido por{" "}
              <DevFullCodeLink className="font-bold text-slate-300 transition-colors hover:text-white">
                <span className="text-indigo-400">D</span>ev
                <span className="text-indigo-400">F</span>ull
                <span className="text-indigo-400">C</span>ode
              </DevFullCodeLink>
            </p>
            <p className="text-xs font-medium tracking-wide text-slate-500">
              <DevFullCodeLink className="transition-colors hover:text-slate-300">
                Transformando Códigos em Soluções
              </DevFullCodeLink>
            </p>
            <p className="text-xs text-slate-600">
              © 2016{" "}
              <DevFullCodeLink className="transition-colors hover:text-slate-400">
                DevFullCode
              </DevFullCodeLink>
              . Todos os direitos reservados.
            </p>
          </div>
        </div>
      </PageShell>
    </footer>
  );
}
