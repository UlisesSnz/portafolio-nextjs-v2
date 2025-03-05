import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import FeaturedArticleCard from '@/components/Blog/FeaturedArticleCard';
import { getArticles } from '@/sanity/sanity.query';

export const metadata = {
  title: "Blog",
  description: `Lee artículos, tutoriales y experiencias sobre desarrollo web en mi blog personal.`,
};

const blog = async () => {
  const articles = await getArticles();

  return (
    <>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Las palabras cambian al mundo" className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl" />
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

export default blog;
