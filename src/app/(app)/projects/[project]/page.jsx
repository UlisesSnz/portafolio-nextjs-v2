import { getSingleProject } from '@/sanity/sanity.query';
import Post from '@/components/Post';

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
            updatedAt={project._updatedAt}
            slug={slug}
            commentsOrder={commentsOrder}
        />
    );
}

export default project;
