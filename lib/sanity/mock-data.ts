import type { Post } from "./types";

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
    pros: [
      "Cancelamento de ruído eficiente",
      "Conforto para uso prolongado",
      "Bateria acima da média",
    ],
    cons: ["App básico", "Case um pouco grande"],
    verdict:
      "O modelo analisado entrega um pacote equilibrado para a faixa de preço, com isolamento confiável e autonomia acima da média.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Depois de duas semanas de testes em escritório, transporte e academia, este review destacou o equilíbrio entre conforto, isolamento e preço.",
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
    pros: ["Tela fluida", "Câmera versátil", "Carregamento rápido"],
    cons: ["Sem slot SD", "Software com apps extras"],
    verdict:
      "Para quem busca tela e câmera sem ir ao topo da linha, o conjunto analisado segue como uma escolha forte em 2026.",
  },
  {
    _id: "post-3",
    title: "Como avaliamos reviews com nota editorial",
    slug: "como-avaliamos-reviews-nota-editorial",
    excerpt:
      "Entenda os critérios usados nas análises e como interpretar notas, prós, contras e veredito.",
    readingTime: 5,
    publishedAt: "2026-03-20T10:00:00.000Z",
    featured: true,
  },
  {
    _id: "post-4",
    title: "Dispositivos inteligentes em 2026: o que observar antes de escolher",
    slug: "dispositivos-inteligentes-2026-o-que-observar",
    excerpt:
      "Uma análise dos principais pontos de atenção em conectividade, privacidade, compatibilidade e custo-benefício.",
    rating: 8.9,
    readingTime: 7,
    publishedAt: "2026-05-10T10:00:00.000Z",
    featured: true,
  },
];
