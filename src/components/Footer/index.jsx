'use client';
import { usePathname } from 'next/navigation';
import Layout from '../Shared/Layout';
import NoScrollLink from '../Shared/NoScrollLink';

const Footer = () => {
  const pathname = usePathname()
  const isAboutPage = pathname === '/about';

  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span className="xs:text-center">{new Date().getFullYear()} &copy; Derechos Reservados.</span>
        <div className="flex items-center lg:py-2">
          Construido Con <span className="text-primary dark:text-primaryDark text-2xl px-1">&#9825;</span>
          & Next.js 14
        </div>
        <NoScrollLink
          href="/about"
          title="Sobre Mí"
          className={`underline underline-offset-2 ${isAboutPage ? 'decoration-primary dark:decoration-primaryDark' : ''}`}
        />
      </Layout>
    </footer>
  )
}

export default Footer;