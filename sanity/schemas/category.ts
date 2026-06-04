import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categorias de Loja",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rótulo / Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ícone",
      type: "image",
      options: { hotspot: true },
      description: "Upload de imagem/ícone (SVG ou PNG recomendado com fundo transparente)",
    }),
    defineField({
      name: "link",
      title: "Link de redirecionamento",
      type: "url",
      validation: (rule) => rule.required().uri({
        scheme: ["http", "https"],
      }),
      description: "Link que direciona para a categoria da loja virtual",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "icon",
    },
  },
});
