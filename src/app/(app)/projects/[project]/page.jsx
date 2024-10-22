import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { getSingleProject } from '@/sanity/sanity.query';
import AnimatedText from '@/components/Animations/AnimatedText';
import { GithubIcon } from '@/components/Shared/Icons';
import Layout from '@/components/Shared/Layout';
import PortableTextComponents from '@/components/Shared/PortableTextComponents ';

const project = async ({ params }) => {
    const slug = params.project;
    const project = await getSingleProject(slug);
  
    return (
        <article className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
            <Layout className="pt-16">
                <AnimatedText
                    text={project.name}
                    className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
                />
                <div className="flex items-center justify-center sm:flex-wrap">
                    <div className="underline underline-offset-2 sm:mb-2">
                        <a href="../about" target="_blank" className="flex items-center">
                            <span className="font-os font-bold dark:font-semibold">Ulises Sánchez</span>
                        </a>
                    </div>
                    <span className="text-md font-medium mx-8 text-placeholder dark:text-light sm:mx-4 sm:text-sm sm:mb-2">
                        10 mn de lectura
                    </span>
                    <span className="text-md font-medium text-placeholder dark:text-light sm:text-sm sm:mb-2">
                        Act. el 15/10/24
                    </span>
                </div>
                <div className="text-md my-6 w-full text-center font-medium capitalize text-placeholder dark:text-light
                    sm:text-sm sm:leading-snug"
                >
                    Etiquetas:&nbsp;
                    <a href="#" className="mr-3 rounded font-semibold capitalize text-primary dark:text-primaryDark
                        underline underline-offset-2 hover:bg-transparent"
                    >
                        #react-js
                    </a>
                </div>
                <figure className="relative aspect-video w-full">
                    <Image
                        src={project.coverImage?.image || fallBackImage}
                        alt={project.coverImage?.alt || project.name}
                        width={project.coverImage.imageWidth}
                        height={project.coverImage.imageHeight}
                        className="w-full h-auto transform object-center rounded-xl"
                        priority
                        sizes="100vw"
                    />
                </figure>

                <div className="grid grid-cols-12 gap-y-8 gap-16 xl:gap-8 md:gap-x-0 mt-8">
                    <div className="col-span-4 lg:col-span-12">
                        <details className="border-[1px] border-solid border-dark dark:border-light text-dark
                            dark:text-light rounded-xl p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
                            open
                        >
                            <summary className="text-lg font-bold text-dark/75 dark:text-light/75 cursor-pointer">
                                Tabla de Contenido
                            </summary>
                        </details>
                    </div>
                    <div className="col-span-8 lg:col-span-12 space-y-4 font-medium max-w-max">
                        <PortableText value={project.description} components={PortableTextComponents} />
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
                    <div className="mt-16 flex items-end">
                        <Link href={project.githubUrl} target="_blank" className="w-10">
                            {" "}
                            <GithubIcon />{" "}
                        </Link>
                        <Link
                            href={project.projectUrl}
                            target="_blank"
                            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark
                            sm:px-4 sm:text-base"
                        >
                            Ver Proyecto
                        </Link>
                    </div>
                </div>
            </Layout>
        </article>
    );
}

export default project;
