import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SanityBanner } from "@/components/shared/sanity-banner";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-page">
      <SanityBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
