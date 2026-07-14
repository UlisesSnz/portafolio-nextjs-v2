import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getArticleSlugs, getSingleArticle } from '@/sanity/sanity.query';
import Post from '@/components/Post';
import siteMetadata from '@/utils/siteMetaData';
import { buildMetadata, buildTranslatedPathnames } from '@/utils/seoMetadata';
import { permanentRedirect, redirect } from '@/i18n/navigation';
import { LocalePathRegistration } from '@/components/Navbar/LocalePathContext';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const entries = await Promise.all(
    ['es', 'en'].map(async (locale) => {
      const articles = await getArticleSlugs(locale);
      return articles.map(({ slug }) => ({ locale, article: slug }));
    })
  );

  return entries.flat();
}

export async function generateMetadata({ params }) {
  const { locale, article: slug } = await params;
  const { content: article } = await getSingleArticle(slug, locale);

  if (!article) return {};

  return buildMetadata({
    seo: article.seo,
    title: article.name,
    description: article.shortDescription,
    pathname: `/blog/${article.slug}`,
    locale,
    type: 'article',
    alternatePathnames: buildTranslatedPathnames(article.translations, '/blog'),
  });
}

export default async function ArticlePage({ params, searchParams }) {
  const [{ locale, article: slug }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);
  const commentsOrder = ['asc', 'desc'].includes(resolvedSearchParams.comments)
    ? resolvedSearchParams.comments
    : 'desc';
  const { content: article, sourceExists } = await getSingleArticle(slug, locale);

  if (!article) {
    if (sourceExists) redirect({ href: '/blog', locale });
    notFound();
  }

  if (article.slug !== slug) {
    permanentRedirect({ href: `/blog/${article.slug}`, locale });
  }

  const shareUrl = `${siteMetadata.siteUrl}/${locale}/blog/${article.slug}`;
  const translatedPathnames = buildTranslatedPathnames(article.translations, '/blog');
  const alternatePathnames = {
    es: translatedPathnames.es || '/blog',
    en: translatedPathnames.en || '/blog',
    [locale]: `/blog/${article.slug}`,
  };

  return (
    <>
      <LocalePathRegistration pathnames={alternatePathnames} />
      <Post
        postId={article._id}
        contentType="article"
        title={article.name}
        estimatedReadingTime={article.estimatedReadingTime}
        coverImage={article.coverImage}
        headings={article.headings}
        description={article.description}
        categories={article.categories}
        slug={article.slug}
        date={article.date}
        commentsOrder={commentsOrder}
        shareUrl={shareUrl}
      />
    </>
  );
}
