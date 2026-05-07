import Link from 'next/link';
import AnimatedText from '@/components/Animations/AnimatedText';
import PostCard from '@/components/Post/PostCard';
import Layout from '@/components/Shared/Layout';
import { getCategories, getPostsBySlug, getRecentPosts } from '@/sanity/sanity.query';
import ListCard from '@/components/Post/ListCard';

export const metadata = {
    title: "Categorías",
    description: `Aquí encontrara todos mis posts y proyectos.`,
};

const formatSlug = (slug) => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const posts = async ({ params }) => {
    const resolvedParams = await params;
    const slug = resolvedParams.posts;
    const categories = await getCategories();
    const recentPosts = await getRecentPosts();
    const posts = await getPostsBySlug(slug);

    return (
    <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
      <Layout className="pt-16">
        <AnimatedText
          text={formatSlug(slug)}
          className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
        />
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
                                    href={`/search/${category.slug}`}
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

export default posts;
