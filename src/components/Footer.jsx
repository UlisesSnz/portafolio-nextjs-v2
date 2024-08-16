import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from './Layout';
import NoScrollLink from './NoScrollLink';

const Footer = () => {
  const router  = useRouter();
  const isContactPage = router.pathname === '/contact';

  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span className="xs:text-center">{new Date().getFullYear()} &copy; Derechos Reservados.</span>
        <div className="flex items-center lg:py-2">
          Construido Con <span className="text-primary dark:text-primaryDark text-2xl px-1">&#9825;</span>
          Por&nbsp;
          <Link href="https://github.com/UlisesSnz" className="underline underline-offset-2" target="_blank">
            UlisesSnz
          </Link>
        </div>
        <NoScrollLink
          href="/contact"
          title="Di Hola"
          className={`underline underline-offset-2 ${isContactPage ? 'decoration-primary dark:decoration-primaryDark' : ''}`}
        />
      </Layout>
    </footer>
  )
}

export default Footer;
