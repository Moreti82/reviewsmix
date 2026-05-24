import { cn } from "@/lib/utils";

type PageBannerProps = {
  className?: string;
};

export function PageBanner({ className }: PageBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b bg-mesh",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50/70 via-white/20 to-orange-50/60" />
    </div>
  );
}
