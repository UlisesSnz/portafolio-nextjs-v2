import { getArticles, getSingleArticle } from '@/sanity/sanity.query';
import Post from '@/components/Post';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(article => ({
    article: article.slug,
  }));
}

const article = async ({ params, searchParams }) => {
    const slug = params.article;
    const commentsOrder = (searchParams.comments === 'asc' || searchParams.comments === 'desc')
        ? searchParams.comments
        : 'desc';
    const article = await getSingleArticle(slug);
  
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
