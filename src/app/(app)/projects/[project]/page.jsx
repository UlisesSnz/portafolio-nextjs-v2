import { getProjectSlugs, getSingleProject } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';
import siteMetadata from '@/utils/siteMetaData';
import { buildMetadata } from '@/utils/seoMetadata';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const projects = await getProjectSlugs();
  return projects.map(project => ({
    project: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project = await getSingleProject(slug);

  if (!project) {
    return {};
  }

  return buildMetadata({
    seo: project.seo,
    title: project.name,
    description: project.shortDescription,
    pathname: `/projects/${slug}`,
  });
}

const project = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.project;
  const commentsOrder = (resolvedSearchParams.comments === 'asc' || resolvedSearchParams.comments === 'desc')
    ? resolvedSearchParams.comments
        : 'desc';
    const project = await getSingleProject(slug);
  if (!project) {
    notFound();
  }
  const shareUrl = `${siteMetadata.siteUrl}/projects/${slug}`;
  
    return (
        <Post
            postId={project._id}
            title={project.name}
            estimatedReadingTime={project.estimatedReadingTime}
            coverImage={project.coverImage}
            headings={project.headings}
            description={project.description}
            githubUrl={project.githubUrl}
            projectUrl={project.projectUrl}
            categories={project.categories}
            slug={slug}
            date={project.date}
            commentsOrder={commentsOrder}
            shareUrl={shareUrl}
        />
    );
}

export default project;
