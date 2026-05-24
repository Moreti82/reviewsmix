import { ThumbsDown, ThumbsUp } from "lucide-react";

type ProsConsProps = {
  pros?: string[];
  cons?: string[];
};

export function ProsCons({ pros, cons }: ProsConsProps) {
  if (!pros?.length && !cons?.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {pros?.length ? (
        <div className="overflow-hidden rounded-lg border border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-base font-bold text-emerald-900">
            <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
              <ThumbsUp className="size-4" />
            </span>
            Prós
          </h3>
          <ul className="mt-4 space-y-2.5">
            {pros.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm text-emerald-950"
              >
                <span className="mt-0.5 shrink-0 font-bold text-emerald-500">+</span>
                <span className="rich-text flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {cons?.length ? (
        <div className="overflow-hidden rounded-lg border border-rose-200/80 bg-gradient-to-br from-rose-50 to-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-base font-bold text-rose-900">
            <span className="flex size-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-600">
              <ThumbsDown className="size-4" />
            </span>
            Contras
          </h3>
          <ul className="mt-4 space-y-2.5">
            {cons.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm text-rose-950"
              >
                <span className="mt-0.5 shrink-0 font-bold text-rose-500">−</span>
                <span className="rich-text flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
