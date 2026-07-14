export const SUPPORTED_LOCALES = ['es', 'en'];

export const DEFAULT_LOCALE = 'es';

export const LOCALE_DEFINITIONS = [
  { id: 'es', title: 'Español', regionalLocale: 'es-MX', openGraphLocale: 'es_MX' },
  { id: 'en', title: 'English', regionalLocale: 'en', openGraphLocale: 'en' },
];

export const TRANSLATED_SCHEMA_TYPES = [
  'article',
  'project',
  'profile',
  'job',
  'education',
  'category',
  'seoPage',
];

export function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

export function getLocaleDefinition(locale) {
  return LOCALE_DEFINITIONS.find(({ id }) => id === locale) || LOCALE_DEFINITIONS[0];
}
