import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import Image from 'next/image';
import Skills from '@/components/About/Skills';
import Experience from '@/components/About/Experience';
import Education from '@/components/About/Education';
import AnimatedNumbers from '@/components/About/AnimatedNumbers';
import { getEducation, getJob, getProfile } from '@/sanity/sanity.query';
import { PortableText } from 'next-sanity';

export const metadata = {
    title: "Sobre mí",
    description: `Conoce más sobre mi trayectoria profesional y personal.`,
};

const about = async () => {
    const profile = await getProfile();
    const job = await getJob();
    const education = await getEducation();

    return (
        <main className="flex w-full flex-col items-center justify-center dark:text-light">
            <Layout className="pt-16">
                <AnimatedText text="Solo un poco más de mí" className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8" />
                {profile && profile.map(data => (
                    <>
                        <div key={data._id} className="grid w-full grid-cols-8 gap-16 sm:gap-8">
                            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
                                <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">Biografía</h2>
                                <div className="space-y-4 font-medium">
                                    <PortableText value={data.fullBiography} />
                                </div>
                            </div>

                            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid
                                border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4
                                md:order-1 md:col-span-8"
                            >
                                <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] rounded-br-3xl bg-dark dark:bg-light" />
                                <Image
                                    src={data.profileImage.image}
                                    alt={data.profileImage.alt}
                                    className="w-full h-auto rounded-2xl"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    width={data.profileImage.imageWidth}
                                    height={data.profileImage.imageHeight}
                                />
                            </div>

                            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
                                <div className="flex flex-col items-end justify-center xl:items-center">
                                    <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                                        <AnimatedNumbers value={data.developerStatistic.programmingLanguagesLearned} />+
                                    </span>
                                    <h2 className="text-lg font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg
                                        sm:text-base xs:text-sm">
                                        Lenguajes de programación
                                    </h2>
                                </div>
                                <div className="flex flex-col items-end justify-center xl:items-center">
                                    <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                                    <AnimatedNumbers value={data.developerStatistic.completedProjects} />+
                                    </span>
                                    <h2 className="text-lg font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg
                                        sm:text-base xs:text-sm">
                                        Proyectos completados
                                    </h2>
                                </div>
                                <div className="flex flex-col items-end justify-center xl:items-center">
                                    <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                                        <AnimatedNumbers value={data.developerStatistic.technologiesLearned} />+
                                    </span>
                                    <h2 className="text-lg font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg
                                        sm:text-base xs:text-sm">
                                        Tecnologías aprendidas
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <Skills skills={data.skills} />
                    </>
                ))}
                <Experience job={job} />
                <Education education={education} />
            </Layout>
        </main>
    )
}

export default about;
