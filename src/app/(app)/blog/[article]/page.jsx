import { getArticles, getSingleArticle } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(article => ({
    article: article.slug,
  }));
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
        />
    );
}

export default article;
