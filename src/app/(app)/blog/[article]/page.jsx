import { getArticles, getSingleArticle } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';
import siteMetadata from '@/utils/siteMetaData';
import { urlFor } from '@/sanity/lib/image';

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

  const shareUrl = `${siteMetadata.siteUrl}/blog/${slug}`;
  const description = article.openGraphDescription || article.shortDescription || siteMetadata.description;
  const openGraphImageUrl = article.openGraphImage
    ? urlFor(article.openGraphImage).width(1200).height(630).fit('crop').url()
    : article.coverImage?.image;

  return {
    title: article.name,
    description,
    alternates: {
      canonical: shareUrl,
    },
    openGraph: {
      title: article.name,
      description,
      url: shareUrl,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: 'article',
      images: openGraphImageUrl ? [{
        url: openGraphImageUrl,
        width: 1200,
        height: 630,
        alt: article.openGraphImage?.alt || article.coverImage?.alt || article.name,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.name,
      description,
      images: openGraphImageUrl ? [openGraphImageUrl] : undefined,
    },
  };
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
