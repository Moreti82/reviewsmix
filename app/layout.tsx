import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";

import { JsonLd, websiteJsonLd } from "@/components/seo/json-ld";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
});

const headingFont = Sora({
  subsets: ["latin"],
  variable: "--font-heading-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),

  title: {
    default: "ReviewsMix",
    template: "%s | ReviewsMix",
  },

  description:
    "Reviews, comparações e análises completas dos melhores produtos.",

  openGraph: {
    title: "ReviewsMix",
    description:
      "Reviews, comparações e análises completas dos melhores produtos.",
    siteName: "ReviewsMix",
    locale: "pt_BR",
    type: "website",
  },

  authors: [{ name: "DevFullCode" }],
  creator: "DevFullCode",
  other: {
    developer: "DevFullCode — Transformando Códigos em Soluções",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bodyFont.variable} ${headingFont.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <JsonLd data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
