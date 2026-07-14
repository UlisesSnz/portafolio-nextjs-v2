export const SEO_DEFAULT_DOCUMENT_ID = 'seo-default';

export const SEO_PAGE_DEFINITIONS = [
  { key: 'home', documentId: 'seo-home', title: 'Inicio' },
  { key: 'about', documentId: 'seo-about', title: 'Sobre mí' },
  { key: 'contact', documentId: 'seo-contact', title: 'Contacto' },
  { key: 'projects', documentId: 'seo-projects', title: 'Proyectos' },
  { key: 'blog', documentId: 'seo-blog', title: 'Blog' },
  { key: 'categories', documentId: 'seo-categories', title: 'Categorías' },
];

export const SEO_PAGE_BY_KEY = Object.fromEntries(
  SEO_PAGE_DEFINITIONS.map((page) => [page.key, page])
);

export const getSeoDocumentId = (pageKey, locale) => {
  if (pageKey === 'default') return `${SEO_DEFAULT_DOCUMENT_ID}-${locale}`;

  const page = SEO_PAGE_BY_KEY[pageKey];
  if (!page) throw new Error(`Página SEO no soportada: ${pageKey}`);

  return `${page.documentId}-${locale}`;
};
