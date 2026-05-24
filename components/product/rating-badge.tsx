import { cn } from "@/lib/utils";

type RatingBadgeProps = {
  rating: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

function ratingTone(rating: number) {
  if (rating >= 9) {
    return "from-emerald-500 to-teal-500 text-white shadow-emerald-500/30";
  }
  if (rating >= 7.5) {
    return "from-primary to-blue-600 text-white shadow-primary/30";
  }
  if (rating >= 6) {
    return "from-amber-500 to-orange-500 text-white shadow-amber-500/30";
  }
  return "from-rose-500 to-red-500 text-white shadow-rose-500/30";
}

export function RatingBadge({
  rating,
  className,
  size = "md",
}: RatingBadgeProps) {
  const label = rating.toFixed(1);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br font-bold shadow-md",
        ratingTone(rating),
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-2.5 py-1 text-sm",
        size === "lg" && "px-3.5 py-1.5 text-base",
        className
      )}
      title={`Nota ${label} de 10`}
    >
      {label}
    </span>
  );
}
