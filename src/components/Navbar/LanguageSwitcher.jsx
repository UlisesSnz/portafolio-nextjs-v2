'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/i18n/navigation';
import { GlobeIcon } from '../Shared/Icons';
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
  const targetLocale = locale === 'es' ? 'en' : 'es';
  const targetLanguage = t(targetLocale === 'es' ? 'spanish' : 'english');
  const accessibleLabel = `${t('switchLanguage')}: ${targetLanguage}`;

  return (
    <a
      href={getLocaleHref(
        targetLocale,
        alternatePathnames[targetLocale] || pathname,
        searchParams
      )}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className={`mx-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dark p-1 text-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light dark:bg-light dark:text-dark dark:focus-visible:ring-primaryDark dark:focus-visible:ring-offset-dark ${className}`}
    >
      <GlobeIcon className="h-full w-full" aria-hidden="true" />
    </a>
  );
};

export default LanguageSwitcher;
