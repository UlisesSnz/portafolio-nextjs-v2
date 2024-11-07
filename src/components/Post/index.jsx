import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import AnimatedText from '@/components/Animations/AnimatedText';
import { GithubIcon, Pencil } from '@/components/Shared/Icons';
import Layout from '@/components/Shared/Layout';
import PortableTextComponents from '@/components/Shared/PortableTextComponents ';
import TableOfContent from './TableOfContent';

const Post = ({
        title,
        estimatedReadingTime,
        coverImage,
        headings,
        description,
        githubUrl,
        projectUrl,
        updatedAt
    }) => {
  
    return (
        <article className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
            <Layout className="pt-16">
                <AnimatedText
                    text={title}
                    className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
                />
                <div className="flex items-center justify-center sm:flex-wrap">
                    <div className="underline underline-offset-2 sm:mb-2">
                        <a href="../about" target="_blank" className="flex items-center">
                            <span className="flex font-os font-bold dark:font-semibold text-dark/75 dark:text-light/75">
                                <Pencil className={"h-auto ml-1 !w-6 md:!w-4"} />Ulises Sánchez
                            </span>
                        </a>
                    </div>
                    <span className="text-md font-medium mx-8 text-placeholder text-dark/75 dark:text-light/75 sm:mx-4 sm:text-sm sm:mb-2">
                        {`${estimatedReadingTime} mn de lectura`}
                    </span>
                    <span className="text-md font-medium text-placeholder text-dark/75 dark:text-light/75 sm:text-sm sm:mb-2">
                        {`Act. el ${new Date(updatedAt).toLocaleDateString()}`}
                    </span>
                </div>
                <div className="text-md my-6 w-full text-center font-medium capitalize text-placeholder text-dark/75 dark:text-light/75
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
                        src={coverImage?.image || fallBackImage}
                        alt={coverImage?.alt || project.name}
                        width={coverImage.imageWidth}
                        height={coverImage.imageHeight}
                        className="w-full h-auto transform object-center rounded-xl"
                        priority
                        sizes="100vw"
                    />
                </figure>

                <div className="grid grid-cols-12 gap-y-8 gap-16 xl:gap-8 md:gap-x-0 mt-8">
                    <div className="col-span-4 lg:col-span-12">
                        <TableOfContent headings={headings} />
                    </div>
                    <div className="col-span-8 lg:col-span-12 font-medium max-w-max">
                        <PortableText value={description} components={PortableTextComponents} />
                    </div>
                </div>
                {(githubUrl && projectUrl) && (
                    <div className="flex flex-col items-end justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
                        <div className="mt-16 flex items-end">
                            <Link href={githubUrl} target="_blank" className="w-10">
                                {" "}
                                <GithubIcon />{" "}
                            </Link>
                            <Link
                                href={projectUrl}
                                target="_blank"
                                className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark
                                sm:px-4 sm:text-base"
                            >
                                Ver Proyecto
                            </Link>
                        </div>
                    </div>
                )}
            </Layout>
        </article>
    );
}

export default Post;
