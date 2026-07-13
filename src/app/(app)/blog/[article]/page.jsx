import { getArticles, getSingleArticle } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';
import siteMetadata from '@/utils/siteMetaData';
import { buildMetadata } from '@/utils/seoMetadata';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(article => ({
    article: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.article;
  const article = await getSingleArticle(slug);

  if (!article) {
    return {};
  }

  return buildMetadata({
    seo: article.seo,
    title: article.name,
    description: article.shortDescription,
    pathname: `/blog/${slug}`,
    type: 'article',
  });
}

const article = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.article;
  const commentsOrder = (resolvedSearchParams.comments === 'asc' || resolvedSearchParams.comments === 'desc')
    ? resolvedSearchParams.comments
        : 'desc';
    const article = await getSingleArticle(slug);
  if (!article) {
    notFound();
  }
  const shareUrl = `${siteMetadata.siteUrl}/blog/${slug}`;
  
    return (
        <Post
            postId={article._id}
            title={article.name}
            estimatedReadingTime={article.estimatedReadingTime}
            coverImage={article.coverImage}
            headings={article.headings}
            description={article.description}
            categories={article.categories}
            slug={slug}
            date={article.date}
            commentsOrder={commentsOrder}
            shareUrl={shareUrl}
        />
    );
}

export default article;
