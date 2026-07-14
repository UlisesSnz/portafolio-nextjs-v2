'use client';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Layout from '../Shared/Layout';

const Footer = () => {
  const t = useTranslations('Footer');
  const pathname = usePathname()
  const isAboutPage = pathname === '/about';

  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span className="xs:text-center">{new Date().getFullYear()} &copy; {t('rights')}</span>
        <div className="flex items-center lg:py-2">
          {t('built')} <span className="text-primary dark:text-primaryDark text-2xl px-1">&#9825;</span>
          & Next.js 16
        </div>
        <Link
          href="/about"
          className={`underline underline-offset-2 ${isAboutPage ? 'decoration-primary dark:decoration-primaryDark' : ''}`}
        >
          {t('about')}
        </Link>
      </Layout>
    </footer>
  )
}

export default Footer;
