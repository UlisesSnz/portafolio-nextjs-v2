import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import SortControls from '@/components/Shared/SortControls';
import FeaturedArticleCard from '@/components/Blog/FeaturedArticleCard';
import { getArticles } from '@/sanity/sanity.query';
import { normalizeContentSort, sortContentItems } from '@/utils/contentSort';

export const metadata = {
  title: "Blog",
  description: `Lee artículos, tutoriales y experiencias sobre desarrollo web en mi blog personal.`,
};

const BlogPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const activeSort = normalizeContentSort(resolvedSearchParams?.sort);
  const articles = sortContentItems(await getArticles(), activeSort);

  return (
    <>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Las palabras cambian al mundo" className="mb-8 lg:!text-7xl sm:mb-6 sm:!text-6xl xs:!text-4xl" />
          <SortControls
            activeSort={activeSort}
            basePath="/blog"
            className="mb-16 w-full sm:mb-8"
          />
          <ul className="grid grid-cols-4 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            {articles.map(article => (
              <FeaturedArticleCard
                key={article._id}
                title={article.name}
                summary={article.shortDescription}
                categories={article.categories}
                link={`/blog/${article.slug}`}
                img={article.coverImage}
                date={article.date}
              />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  )
}

export default BlogPage;
