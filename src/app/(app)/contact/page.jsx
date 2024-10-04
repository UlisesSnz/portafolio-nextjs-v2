import { Toaster } from 'sonner';
import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import LottieAnimation from '@/components/Contact/LottieAnimation';
import ContactForm from '@/components/Contact/ContactForm';
import siteMetadata from '@/utils/siteMetaData';

export const metadata = {
    title: "Contactame",
    description: `Contáctame a través del formulario disponible en esta página o envíame un correo electrónico a ${siteMetadata.email}`,
};

const contact = () => {
    return (
        <>
            <main className="flex items-center text-dark w-full min-h-screen dark:text-light sm:items-start">
                <Layout className="!pt-0 md:!pt-14 sm:!pt-10">
                    <div className="flex items-center justify-between w-full lg:flex-col h-[75vh] lg:h-auto">
                        <div className="inline-block w-2/5 md:w-4/5 sm:w-full lg:h-[15vh] md:h-[25vh]">
                            <LottieAnimation />
                        </div>
                        <div className="w-3/5 flex flex-col items-center self-center lg:w-full pl-16 lg:pl-0 pb-8">
                            <AnimatedText
                                text="¡Conectemos!"
                                className="!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
                            />
                            <div className="my-4 text-base font-medium md:text-sm sm:text-xs">
                                <p className="mb-4">
                                    Contáctame a través del siguiente formulario o envíame un correo electrónico a&ensp;
                                    <a href={`mailto:${siteMetadata.email}`} className="underline underline-offset-2">{siteMetadata.email}</a>.
                                </p>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </Layout>
            </main>
            <Toaster theme='system' duration={3000} />
        </>
    )
}

export default contact;
