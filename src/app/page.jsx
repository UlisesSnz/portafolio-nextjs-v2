import Layout from '@/components/Shared/Layout';
import Image from 'next/image';
import profilePic from '../../public/images/profile/developer.png'
import AnimatedText from '@/components/Animations/AnimatedText';
import Link from 'next/link';
import { LinkArrow } from '@/components/Shared/Icons';
import HireMe from '../components/Home/HireMe';
import lighBulb from '../../public/images/svgs/spotlight.svg';

export default function Home() {
  return (
    <main className="flex items-center text-dark w-full min-h-screen dark:text-light sm:items-start">
        <Layout className="!pt-0 md:!pt-14 sm:!pt-14">
            <div className="flex items-center justify-between w-full lg:flex-col">
                <div className="w-1/2 md:w-full">
                    <Image src={profilePic} alt="Desarrollador" className="w-full h-auto lg:hidden md:inline-block md:w-full"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                </div>
                <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
                    <AnimatedText text="Desarrollando sueños con código." className="!text-6xl !text-left
                    xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
                    />
                    <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                    Como desarrollador, disfruto convertir ideas en aplicaciones web innovadoras.
                    Siéntase libre de explorar mis últimos proyectos y posts, que muestran mi experiencia programando.
                    </p>
                    <div className="flex items-center self-start mt-2 lg:self-center">
                        <Link
                            href="/ulises.pdf"
                            download="Ulises.pdf"
                            locale={false}
                            rel="noopener noreferrer"
                            target={"_blank"}
                            aria-label="Descargar currículum"
                            prefetch={false}
                            className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg
                            font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                            dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
                            md:p-2 md:px-4 md:text-base"
                        >
                            Currículum <LinkArrow className={"h-auto ml-1 !w-6 md:!w-4"} />
                        </Link>
                        <Link
                            href="/contact"
                            className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base hidden lg:flex"
                        >
                            Contactar
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>

        <HireMe />

        <div className="absolute right-8 bottom-16 inline-block w-24 md:hidden">
            <Image src={lighBulb} alt="Foco que hace referencia a tener una idea" className="w-full h-auto" />
        </div>
    </main>
  )
}
