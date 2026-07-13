import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteMetadata from '@/utils/siteMetaData';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next"
import { getDefaultSeo } from '@/sanity/sanity.query';
import { buildMetadata } from '@/utils/seoMetadata';

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-mont",
});

export async function generateMetadata() {
    let seo;

    try {
        seo = await getDefaultSeo();
    } catch (error) {
        console.error('No fue posible cargar el SEO predeterminado.', error);
    }

    const brandTitle = seo?.title || siteMetadata.title;
    const metadata = buildMetadata({
        seo,
        title: brandTitle,
        description: siteMetadata.description,
        pathname: '/',
        absoluteTitle: true,
    });

    return {
        ...metadata,
        metadataBase: new URL(siteMetadata.siteUrl),
        title: {
            template: `%s | ${brandTitle}`,
            default: brandTitle,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default function RootLayout({ children }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
                <Script id='theme-switcher' strategy='beforeInteractive' >
                    {`
                        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                            document.documentElement.classList.add('dark')
                        } else {
                            document.documentElement.classList.remove('dark')
                        }
                    `}
                </Script>
                <Navbar />
                {children}
                <Footer />
                <div id='modal' />
                <Analytics />
            </body>
        </html>
    );
}
