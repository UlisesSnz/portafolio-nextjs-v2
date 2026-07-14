import 'server-only';

export function isEnglishEnabled() {
  return process.env.ENGLISH_ENABLED === 'true';
}

export function isLocaleEnabled(locale) {
  return locale === 'es' || (locale === 'en' && isEnglishEnabled());
}
