import '@/styles/globals.css';
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteMetadata from '@/utils/siteMetaData';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-mont",
});

export const metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        template: `%s | ${siteMetadata.title}`,
        default: siteMetadata.title,
    },
    description: siteMetadata.description,
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: siteMetadata.siteUrl,
        siteName: siteMetadata.title,
        locale: siteMetadata.locale,
        type: "website",
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

export default function RootLayout({ children }) {
    return (
        <html lang="es">
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