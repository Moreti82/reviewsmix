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
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="absolute -right-16 top-0 size-48 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}
