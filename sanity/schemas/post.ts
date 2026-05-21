import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Review / Artigo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "products",
      title: "Produtos relacionados",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })],
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          lists: [
            { title: "Marcadores", value: "bullet" },
            { title: "Numerada", value: "number" },
          ],
        }),
      ],
    }),
    defineField({
      name: "pros",
      title: "Prós",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "cons",
      title: "Contras",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "verdict",
      title: "Veredito",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "rating",
      title: "Nota do review (0–10)",
      type: "number",
      validation: (rule) => rule.min(0).max(10),
    }),
    defineField({
      name: "readingTime",
      title: "Tempo de leitura (min)",
      type: "number",
    }),
    defineField({
      name: "publishedAt",
      title: "Publicado em",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Destaque na home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO — Título",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO — Descrição",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage",
    },
  },
  orderings: [
    {
      title: "Mais recentes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
