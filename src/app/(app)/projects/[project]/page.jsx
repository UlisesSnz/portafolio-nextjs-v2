import { getSingleProject } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import { getProjects } from '@/sanity/sanity.query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(project => ({
    project: project.slug,
  }));
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
        />
    );
}

export default project;
