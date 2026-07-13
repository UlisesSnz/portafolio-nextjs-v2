import Link from 'next/link';
import AnimatedText from '@/components/Animations/AnimatedText';
import PostCard from '@/components/Post/PostCard';
import Layout from '@/components/Shared/Layout';
import ContentTypeControls from '@/components/Shared/ContentTypeControls';
import SortControls from '@/components/Shared/SortControls';
import { CanaryActionController } from '@/components/Canary';
import { getCategories, getCategorySeo, getPostsBySlug, getRecentPosts } from '@/sanity/sanity.query';
import ListCard from '@/components/Post/ListCard';
import { normalizeContentSort, sortContentItems } from '@/utils/contentSort';
import { filterContentItemsByType, normalizeContentTypeFilter } from '@/utils/contentTypeFilter';
import { buildMetadata } from '@/utils/seoMetadata';

const formatSlug = (slug) => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export async function generateMetadata({ params }) {
    const { posts: slug } = await params;
    let seo;

    try {
        seo = await getCategorySeo(slug);
    } catch (error) {
        console.error(`No fue posible cargar el SEO de la categoría ${slug}.`, error);
    }

    return buildMetadata({
        seo,
        title: formatSlug(slug),
        description: 'Explora mis artículos y proyectos organizados por categoría.',
        pathname: `/search/${slug}`,
    });
}

const PostsPage = async ({ params, searchParams }) => {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
    const slug = resolvedParams.posts;
    const activeSort = normalizeContentSort(resolvedSearchParams?.sort);
    const activeType = normalizeContentTypeFilter(resolvedSearchParams?.type);
    const [categories, recentPosts, postsBySlug] = await Promise.all([
        getCategories(),
        getRecentPosts(),
        getPostsBySlug(slug),
    ]);
    const posts = sortContentItems(
        filterContentItemsByType(postsBySlug, activeType),
        activeSort
    );
    const categoryName = categories.find(category => category.slug === slug)?.name || formatSlug(slug);

    return (
    <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
      <Layout className="pt-16">
        <AnimatedText
          text={formatSlug(slug)}
          className="mb-8 lg:!text-7xl sm:mb-6 sm:!text-6xl xs:!text-4xl"
        />
        <div className="mb-12 flex w-full items-center justify-between gap-6 sm:mb-8 sm:gap-3">
          <CanaryActionController
            context={{
              pageType: "search",
              totalCount: posts.length,
              categoryName,
              activeType,
              activeSort,
            }}
            className="canary-toolbar flex-1"
          />
          <div className="flex shrink-0 items-center justify-end gap-1">
            <ContentTypeControls
                activeType={activeType}
                basePath={`/search/${slug}`}
                query={{ sort: activeSort }}
            />
            <SortControls
                activeSort={activeSort}
                basePath={`/search/${slug}`}
                query={{ type: activeType }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-y-8 gap-16 xl:gap-8 md:gap-x-0 mt-8">
            <div className="col-span-2 lg:col-span-12">
                <details className="border-[1px] border-solid border-dark dark:border-light
                    rounded-xl p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
                    open
                >
                    <summary className="text-lg font-bold cursor-pointer">
                        Categorías
                    </summary>
                    <ul className="mt-4 text-base">
                        {categories.map(category => (
                            <li key={category.slug} className="py-1">
                                <Link
                                    href={{
                                        pathname: `/search/${category.slug}`,
                                        query: { sort: activeSort, type: activeType },
                                    }}
                                    className="flex items-center justify-start transform transition-transform duration-300 hover:translate-x-2"
                                >
                                    <span className={category.slug === slug ? 'underline underline-offset-2' : ''}>
                                        {category.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
            <div className="col-span-10 lg:col-span-12 font-medium max-w-max">
                <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6">
                    {posts.map(post => (
                        <PostCard
                            key={post._id}
                            title={post.name}
                            summary={post.shortDescription}
                            categories={post.categories}
                            img={post.coverImage}
                            link={post.slug}
                            github={post.githubUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
        <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">Código e Ideas Recientes</h2>
        <ul>
            {recentPosts.map(post => (
                <ListCard
                    key={post._id}
                    title={post.name}
                    date={post.date}
                    img={post.coverImage}
                    link={post.slug}
                />
            ))}
        </ul>
      </Layout>
    </main>
    )
}

export default PostsPage;
