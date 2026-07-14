import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
  localeDetection: false,
  localeCookie: false,
  // Metadata API owns canonical and hreflang links so dynamic translated
  // slugs and the staged English rollout stay accurate.
  alternateLinks: false,
});
