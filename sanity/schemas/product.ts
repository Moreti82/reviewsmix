import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "images",
      title: "Imagens",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "shortDescription",
      title: "Descrição curta",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "specs",
      title: "Especificações",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            defineField({ name: "key", title: "Item", type: "string" }),
            defineField({ name: "value", title: "Valor", type: "string" }),
          ],
          preview: {
            select: { title: "key", subtitle: "value" },
          },
        }),
      ],
    }),
    defineField({
      name: "rating",
      title: "Nota (0–10)",
      type: "number",
      validation: (rule) => rule.min(0).max(10),
    }),
    defineField({
      name: "priceRange",
      title: "Faixa de preço",
      type: "string",
      description: 'Ex.: "R$ 299 – R$ 399"',
    }),
    defineField({
      name: "purchaseLinks",
      title: "Onde comprar",
      type: "array",
      of: [defineArrayMember({ type: "purchaseLink" })],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "brand", media: "images.0" },
  },
});
