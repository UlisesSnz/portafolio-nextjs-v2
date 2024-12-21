import { getSingleProject } from '@/sanity/sanity.query';
import Post from '@/components/Post';

const project = async ({ params }) => {
    const slug = params.project;
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
            updatedAt={project._updatedAt}
        />
    );
}

export default project;
