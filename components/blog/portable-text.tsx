import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-mt-20 text-2xl font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="rich-text mt-4 text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="rich-text mt-6 border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="rich-text mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="rich-text mt-4 list-decimal space-y-2 pl-6 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="rich-text">{children}</li>,
    number: ({ children }) => <li className="rich-text">{children}</li>,
  },
};

type PostBodyProps = {
  value?: PortableTextBlock[];
};

export function PostBody({ value }: PostBodyProps) {
  if (!value?.length) return null;
  return (
    <div className="prose-blog max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
