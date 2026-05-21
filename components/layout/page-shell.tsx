import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
};

const widths = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
};

export function PageShell({
  children,
  className,
  narrow = false,
  wide = false,
}: PageShellProps) {
  const width = narrow ? widths.narrow : wide ? widths.wide : widths.default;

  return (
    <div className={cn("site-container", width, className)}>{children}</div>
  );
}
