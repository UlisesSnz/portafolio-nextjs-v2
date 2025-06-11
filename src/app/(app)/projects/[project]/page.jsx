import { getSingleProject } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import { getProjects } from '@/sanity/sanity.query';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(project => ({
    project: project.slug,
  }));
}

const project = async ({ params, searchParams }) => {
    const slug = params.project;
    const commentsOrder = (searchParams.comments === 'asc' || searchParams.comments === 'desc')
        ? searchParams.comments
        : 'desc';
    const project = await getSingleProject(slug);
  
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
