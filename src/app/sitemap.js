import siteMetadata from '@/utils/siteMetaData';
import { getSitemapContent } from '@/sanity/sanity.query';
import { isEnglishEnabled } from '@/i18n/runtime';

const STATIC_PATHS = ['/', '/about', '/contact', '/projects', '/blog'];

const getUrl = (locale, pathname) =>
  new URL(`/${locale}${pathname === '/' ? '' : pathname}`, siteMetadata.siteUrl).toString();

const getContentPath = (document) => {
  const segment = document._type === 'article'
    ? 'blog'
    : document._type === 'project'
      ? 'projects'
      : 'search';

  return `/${segment}/${document.slug}`;
};

export default async function sitemap() {
  const englishEnabled = isEnglishEnabled();
  const enabledLocales = englishEnabled ? ['es', 'en'] : ['es'];
  const content = await getSitemapContent();

  const staticEntries = STATIC_PATHS.flatMap((pathname) =>
    enabledLocales.map((locale) => ({
      url: getUrl(locale, pathname),
      alternates: {
        languages: Object.fromEntries(
          enabledLocales.map((targetLocale) => [targetLocale, getUrl(targetLocale, pathname)])
        ),
      },
    }))
  );

  const contentEntries = content
    .filter(({ language }) => enabledLocales.includes(language))
    .map((document) => {
      const pathname = getContentPath(document);
      const translations = document.translations || [];

      return {
        url: getUrl(document.language, pathname),
        lastModified: document._updatedAt,
        alternates: {
          languages: Object.fromEntries(
            translations
              .filter(({ language }) => enabledLocales.includes(language))
              .map((translation) => [
                translation.language,
                getUrl(
                  translation.language,
                  getContentPath({ ...document, slug: translation.slug })
                ),
              ])
          ),
        },
      };
    });

  return [...staticEntries, ...contentEntries];
}
