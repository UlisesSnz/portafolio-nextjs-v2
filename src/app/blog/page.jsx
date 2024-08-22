import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import article1 from '../../../public/images/articles/pagination component in reactjs.jpg';
import article2 from '../../../public/images/articles/create loading screen in react js.jpg';
import article3 from '../../../public/images/articles/create modal component in react using react portals.png';
import article4 from '../../../public/images/articles/form validation in reactjs using custom react hook.png';
import article5 from '../../../public/images/articles/smooth scrolling in reactjs.png';
import FeaturedArticleCard from '@/components/Blog/FeaturedArticleCard';
import ArticleCard from '@/components/Blog/ArticleCard';

export const metadata = {
  title: "Blog",
  description: `Lee artículos, tutoriales y experiencias sobre desarrollo web en mi blog personal.`,
};

const blog = () => {
  return (
    <>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Las palabras cambian al mundo" className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl" />
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FeaturedArticleCard
              title="Build A Custom Pagination Component In Reactjs From Scratch"
              summary="Learn how to build a custom pagination component in ReactJS from scratch.
              Follow this step-by-step guide to integrate Pagination component in your ReactJS project."
              time="9 min read"
              link="/"
              img={article1}
            />
            <FeaturedArticleCard
              title="Build A Custom Pagination Component In Reactjs From Scratch"
              summary="Learn how to build a custom pagination component in ReactJS from scratch.
              Follow this step-by-step guide to integrate Pagination component in your ReactJS project."
              time="9 min read"
              link="/"
              img={article2}
            />
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">Todos los artículos</h2>
          <ul>
            <ArticleCard
              title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
              date="March 22, 2023"
              link="/"
              img={article3}
            />
            <ArticleCard
              title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
              date="March 22, 2023"
              link="/"
              img={article4}
            />
            <ArticleCard
              title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
              date="March 22, 2023"
              link="/"
              img={article5}
            />
          </ul>
        </Layout>
      </main>
    </>
  )
}

export default blog;
