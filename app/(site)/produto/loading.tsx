import { CardGridSkeleton } from "@/components/shared/skeleton";

export default function ProdutoLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 max-w-3xl space-y-3">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="h-5 w-96 max-w-full animate-pulse rounded bg-muted" />
      </div>
      <CardGridSkeleton />
    </div>
  );
}
