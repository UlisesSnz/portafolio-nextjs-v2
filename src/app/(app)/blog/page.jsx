import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import SortControls from '@/components/Shared/SortControls';
import TagControls from '@/components/Shared/TagControls';
import FeaturedArticleCard from '@/components/Blog/FeaturedArticleCard';
import { getArticles } from '@/sanity/sanity.query';
import { normalizeContentSort, sortContentItems } from '@/utils/contentSort';
import {
  filterContentItemsByTags,
  formatContentTagsQuery,
  getContentTagOptions,
  normalizeContentTags,
} from '@/utils/contentTagFilter';

export const metadata = {
  title: "Blog",
  description: `Lee artículos, tutoriales y experiencias sobre desarrollo web en mi blog personal.`,
};

const BlogPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const activeSort = normalizeContentSort(resolvedSearchParams?.sort);
  const allArticles = await getArticles();
  const tagOptions = getContentTagOptions(allArticles);
  const activeTags = normalizeContentTags(resolvedSearchParams?.tags, tagOptions);
  const articles = sortContentItems(
    filterContentItemsByTags(allArticles, activeTags),
    activeSort
  );

  return (
    <>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Las palabras cambian al mundo" className="mb-8 lg:!text-7xl sm:mb-6 sm:!text-6xl xs:!text-4xl" />
          <div className="mb-16 flex w-full items-center justify-end gap-1 sm:mb-8">
            <TagControls
              activeTags={activeTags}
              basePath="/blog"
              options={tagOptions}
              query={{ sort: activeSort }}
            />
            <SortControls
              activeSort={activeSort}
              basePath="/blog"
              query={{ tags: formatContentTagsQuery(activeTags) }}
            />
          </div>
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
