import { SEO_DEFAULT_DOCUMENT_ID, SEO_PAGE_DEFINITIONS } from './seoPages';

const createSeoDocumentItem = (S, documentId, title) =>
  S.listItem()
    .id(documentId)
    .title(title)
    .child(
      S.document()
        .schemaType('seoPage')
        .documentId(documentId)
        .title(title)
    );

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .id('seo')
        .title('SEO')
        .child(
          S.list()
            .title('SEO')
            .items([
              createSeoDocumentItem(S, SEO_DEFAULT_DOCUMENT_ID, 'Valores predeterminados'),
              S.divider(),
              ...SEO_PAGE_DEFINITIONS.map(({ documentId, title }) =>
                createSeoDocumentItem(S, documentId, title)
              ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'seoPage'),
    ]);
