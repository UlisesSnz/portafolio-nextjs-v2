import { CircularTextEng, CircularTextEsp, EmailIcon } from '../Shared/Icons';
import { useLocale, useTranslations } from 'next-intl';
import siteMetadata from '@/utils/siteMetaData';

const HireMe = () => {
  const locale = useLocale();
  const t = useTranslations('Home');
  const CircularText = locale === 'en' ? CircularTextEng : CircularTextEsp;
  return (
    <div className="fixed left-4 bottom-8
      flex items-center justify-center overflow-hidden md:right-8 md:left-auto md:top-0 md:bottom-auto md:absolute sm:right-0 md:hidden"
    >
        <div className="w-48 h-auto flex items-center justify-center relative md:w-24">
            <CircularText className={"fill-dark animate-spin-slow dark:fill-light"} />

            <a
              href={`mailto:${siteMetadata.email}`}
              aria-label={t('emailAria', { email: siteMetadata.email })}
              className="flex items-center justify-center absolute left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2 bg-dark text-light shadow-md
              border border-solid border-dark w-20 h-20 rounded-full font-semibold
              hover:bg-light hover:text-dark
              dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
              hover:dark:border-light md:w-12 md:h-12 md:text-[10px]" 
            >
              <EmailIcon className={"h-auto !w-8 md:!w-6"} />
            </a>
        </div>
    </div>
  )
}

export default HireMe;
