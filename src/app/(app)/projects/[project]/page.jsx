import { getSingleProject } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import { getProjects } from '@/sanity/sanity.query';
import { notFound } from 'next/navigation';
import siteMetadata from '@/utils/siteMetaData';
import { urlFor } from '@/sanity/lib/image';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const projects = await getProjects();
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

  const shareUrl = `${siteMetadata.siteUrl}/projects/${slug}`;
  const description = project.openGraphDescription || project.shortDescription || siteMetadata.description;
  const openGraphImageUrl = project.openGraphImage
    ? urlFor(project.openGraphImage).width(1200).height(630).fit('crop').url()
    : project.coverImage?.image;

  return {
    title: project.name,
    description,
    alternates: {
      canonical: shareUrl,
    },
    openGraph: {
      title: project.name,
      description,
      url: shareUrl,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: 'website',
      images: openGraphImageUrl ? [{
        url: openGraphImageUrl,
        width: 1200,
        height: 630,
        alt: project.openGraphImage?.alt || project.coverImage?.alt || project.name,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description,
      images: openGraphImageUrl ? [openGraphImageUrl] : undefined,
    },
  };
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
