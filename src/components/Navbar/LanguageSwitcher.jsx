'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/i18n/navigation';
import { useAlternatePathnames } from './LocalePathContext';

const getLocaleHref = (locale, pathname, searchParams) => {
  const localizedPathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  const query = searchParams.toString();
  return query ? `${localizedPathname}?${query}` : localizedPathname;
};

const LanguageSwitcher = ({ className = '' }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Navigation');
  const alternatePathnames = useAlternatePathnames();

  return (
    <nav
      aria-label={t('switchLanguage')}
      className={`ml-3 flex items-center text-xs font-semibold tracking-wide ${className}`}
    >
      {['es', 'en'].map((targetLocale, index) => (
        <span key={targetLocale} className="flex items-center">
          {index > 0 && <span className="px-1 text-dark/35 dark:text-light/35">/</span>}
          <a
            href={getLocaleHref(
              targetLocale,
              alternatePathnames[targetLocale] || pathname,
              searchParams
            )}
            aria-current={locale === targetLocale ? 'page' : undefined}
            aria-label={targetLocale === 'es' ? t('spanish') : t('english')}
            className={
              locale === targetLocale
                ? 'text-primary dark:text-primaryDark'
                : 'text-dark/60 hover:text-dark dark:text-light/60 dark:hover:text-light'
            }
          >
            {targetLocale.toUpperCase()}
          </a>
        </span>
      ))}
    </nav>
  );
};

export default LanguageSwitcher;
