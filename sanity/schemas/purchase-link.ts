import { defineField, defineType } from "sanity";

export const purchaseLink = defineType({
  name: "purchaseLink",
  title: "Link de compra",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Rótulo do botão",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Amazon", value: "amazon" },
          { title: "Mercado Livre", value: "mercadolivre" },
          { title: "Shopee", value: "shopee" },
          { title: "Site oficial", value: "site" },
          { title: "Instagram", value: "instagram" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Outro", value: "other" },
        ],
      },
      initialValue: "other",
    }),
    defineField({
      name: "isAffiliate",
      title: "Link de afiliado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "priority",
      title: "Ordem de exibição",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "platform" },
  },
});
