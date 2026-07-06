import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import SortControls from '@/components/Shared/SortControls';
import FeaturedProjectCard from '@/components/Projects/FeaturedProjectCard';
import { getProjects } from '@/sanity/sanity.query';
import { normalizeContentSort, sortContentItems } from '@/utils/contentSort';

export const metadata = {
  title: "Proyectos",
  description: `Conoce algunos proyectos que muestran mi habilidad en desarrollo web.`,
};

const ProjectsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const activeSort = normalizeContentSort(resolvedSearchParams?.sort);
  const projects = sortContentItems(await getProjects(), activeSort);

  return (
    <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
      <Layout className="pt-16">
        <AnimatedText
          text="La innovación vive en la imaginación"
          className="mb-8 lg:!text-7xl sm:mb-6 sm:!text-6xl xs:!text-4xl"
        />
        <SortControls
          activeSort={activeSort}
          basePath="/projects"
          className="mb-16 w-full sm:mb-8"
        />
        <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
          {projects && projects.map(data => (
            <div className="col-span-12" key={data._id}>
              <FeaturedProjectCard
                title={data.name}
                slug={data.slug}
                img={data.coverImage}
                summary={data.shortDescription}
                link={data.projectUrl}
                github={data.githubUrl}
                categories={data.categories}
              />
            </div>
          ))}
        </div>
      </Layout>
    </main>
  )
}

export default ProjectsPage;
