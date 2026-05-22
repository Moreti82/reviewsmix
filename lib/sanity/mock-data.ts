import type { Category, Post, Product } from "./types";

export const mockCategories: Category[] = [
  {
    _id: "cat-1",
    title: "Áudio",
    slug: "audio",
    description: "Fones, caixas de som e equipamentos de áudio.",
  },
  {
    _id: "cat-2",
    title: "Smartphones",
    slug: "smartphones",
    description: "Celulares e acessórios mobile.",
  },
  {
    _id: "cat-3",
    title: "Casa inteligente",
    slug: "casa-inteligente",
    description: "Automação, câmeras e assistentes virtuais.",
  },
];

export const mockProducts: Product[] = [
  {
    _id: "prod-1",
    name: "Fone Bluetooth Pro X",
    slug: "fone-bluetooth-pro-x",
    brand: "AudioMax",
    shortDescription:
      "Fone com cancelamento de ruído ativo, 40h de bateria e som equilibrado para uso diário.",
    rating: 8.7,
    priceRange: "R$ 299 – R$ 399",
    category: { _id: "cat-1", title: "Áudio", slug: "audio" },
    specs: [
      { key: "ANC", value: "Sim, híbrido" },
      { key: "Bluetooth", value: "5.3" },
      { key: "Bateria", value: "Até 40h" },
    ],
    purchaseLinks: [
      {
        label: "Comprar na Amazon",
        url: "https://amazon.com.br",
        platform: "amazon",
        isAffiliate: true,
        priority: 1,
      },
      {
        label: "Ver na Shopee",
        url: "https://shopee.com.br",
        platform: "shopee",
        isAffiliate: true,
        priority: 2,
      },
      {
        label: "Loja no Instagram",
        url: "https://instagram.com",
        platform: "instagram",
        priority: 3,
      },
    ],
  },
  {
    _id: "prod-2",
    name: "Smartphone Ultra 256GB",
    slug: "smartphone-ultra-256",
    brand: "NovaMobile",
    shortDescription:
      "Tela AMOLED 120Hz, câmera tripla versátil e carregamento rápido de 67W.",
    rating: 9.1,
    priceRange: "R$ 2.499 – R$ 2.899",
    category: { _id: "cat-2", title: "Smartphones", slug: "smartphones" },
    specs: [
      { key: "Tela", value: '6.7" AMOLED 120Hz' },
      { key: "Armazenamento", value: "256 GB" },
      { key: "Câmera principal", value: "50 MP OIS" },
    ],
    purchaseLinks: [
      {
        label: "Mercado Livre",
        url: "https://mercadolivre.com.br",
        platform: "mercadolivre",
        isAffiliate: true,
        priority: 1,
      },
      {
        label: "Site oficial",
        url: "https://example.com",
        platform: "site",
        priority: 2,
      },
    ],
  },
];

export const mockPosts: Post[] = [
  {
    _id: "post-1",
    title: "Melhor fone Bluetooth custo-benefício em 2026",
    slug: "melhor-fone-bluetooth-2026",
    excerpt:
      "Testamos os principais modelos da faixa de R$ 300. Veja qual vale mais a pena para trabalho, viagens e dia a dia.",
    rating: 8.7,
    readingTime: 8,
    publishedAt: "2026-05-01T10:00:00.000Z",
    featured: true,
    category: { _id: "cat-1", title: "Áudio", slug: "audio" },
    products: [mockProducts[0]],
    pros: [
      "Cancelamento de ruído eficiente",
      "Conforto para uso prolongado",
      "Bateria acima da média",
    ],
    cons: ["App básico", "Case um pouco grande"],
    verdict:
      "O Fone Bluetooth Pro X entrega o pacote mais completo na faixa de preço, com ANC confiável e autonomia excelente.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Depois de duas semanas de testes em escritório, transporte e academia, o Pro X se destacou pelo equilíbrio entre conforto, isolamento e preço.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-2",
    title: "Smartphone Ultra 256GB: vale o investimento?",
    slug: "smartphone-ultra-256-review",
    excerpt:
      "Análise completa de desempenho, câmeras e bateria do intermediário premium mais comentado do ano.",
    rating: 9.1,
    readingTime: 10,
    publishedAt: "2026-04-15T10:00:00.000Z",
    featured: true,
    category: { _id: "cat-2", title: "Smartphones", slug: "smartphones" },
    products: [mockProducts[1]],
    pros: ["Tela fluida", "Câmera versátil", "Carregamento rápido"],
    cons: ["Sem slot SD", "Software com apps extras"],
    verdict:
      "Para quem busca tela e câmera sem ir ao topo da linha, o Ultra 256GB é uma das melhores escolhas de 2026.",
  },
  {
    _id: "post-3",
    title: "Guia rápido: como escolher produtos com link de afiliado",
    slug: "guia-links-afiliados",
    excerpt:
      "Entenda como avaliamos produtos e por que indicamos lojas confiáveis com transparência.",
    rating: undefined,
    readingTime: 5,
    publishedAt: "2026-03-20T10:00:00.000Z",
    featured: true,
    category: { _id: "cat-3", title: "Casa inteligente", slug: "casa-inteligente" },
  },
  {
    _id: "post-4",
    title: "Melhores dispositivos de Casa Inteligente com Alexa em 2026",
    slug: "melhores-dispositivos-casa-inteligente-2026",
    excerpt:
      "Análise dos principais gadgets compatíveis com a Alexa para transformar sua rotina doméstica com praticidade e economia.",
    rating: 8.9,
    readingTime: 7,
    publishedAt: "2026-05-10T10:00:00.000Z",
    featured: true,
    category: { _id: "cat-3", title: "Casa inteligente", slug: "casa-inteligente" },
  },
];
