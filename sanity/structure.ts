import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("ReviewsMix")
    .items([
      S.listItem()
        .title("Reviews em destaque")
        .child(
          S.documentList()
            .title("Destaques")
            .filter('_type == "post" && featured == true')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Reviews / Artigos"),
      S.documentTypeListItem("category").title("Categorias de Loja"),
    ]);
