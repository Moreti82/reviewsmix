type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={`mb-12 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      {eyebrow ? <p className="section-label mb-4">{eyebrow}</p> : null}
      <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          {description}
        </p>
      ) : null}
    </header>
  );
}
