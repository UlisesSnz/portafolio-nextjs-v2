import { LOCALE_DEFINITIONS } from '../i18n/config';
import { getSeoDocumentId, SEO_PAGE_DEFINITIONS } from './seoPages';

const PROFILE_DOCUMENT_IDS = {
  es: '555eb560-7bd1-4752-ad10-1cac1b6a7714',
  en: 'i18n-en-555eb560-7bd1-4752-ad10-1cac1b6a7714',
};

const createLocalizedSeoItem = (S, key, title) =>
  S.listItem()
    .id(`seo-${key}`)
    .title(title)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALE_DEFINITIONS.map(({ id, title: languageTitle }) => {
            const documentId = getSeoDocumentId(key, id);

            return S.documentListItem()
              .id(documentId)
              .schemaType('seoPage')
              .title(`${languageTitle} (${id.toUpperCase()})`)
              .child(
                S.document()
                  .schemaType('seoPage')
                  .documentId(documentId)
                  .initialValueTemplate(`seoPage-${id}`)
                  .title(`${title} · ${languageTitle}`)
              );
          })
        )
    );

const createProfileItem = (S) =>
  S.listItem()
    .id('profile-localized')
    .title('Perfil')
    .child(
      S.list()
        .title('Perfil')
        .items(
          LOCALE_DEFINITIONS.map(({ id, title }) =>
            S.documentListItem()
              .id(PROFILE_DOCUMENT_IDS[id])
              .schemaType('profile')
              .title(`${title} (${id.toUpperCase()})`)
              .child(
                S.document()
                  .schemaType('profile')
                  .documentId(PROFILE_DOCUMENT_IDS[id])
                  .title(`Perfil · ${title}`)
              )
          )
        )
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
              createLocalizedSeoItem(S, 'default', 'Valores predeterminados'),
              S.divider(),
              ...SEO_PAGE_DEFINITIONS.map(({ key, title }) =>
                createLocalizedSeoItem(S, key, title)
              ),
            ])
        ),
      S.divider(),
      createProfileItem(S),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['seoPage', 'profile', 'translation.metadata'].includes(item.getId())
      ),
    ]);
