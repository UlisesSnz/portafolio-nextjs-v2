import AnimatedText from '@/components/Animations/AnimatedText';
import Layout from '@/components/Shared/Layout';
import project1 from '../../../public/images/projects/portfolio-spa-react-threejs-image.jpg';
import project2 from '../../../public/images/projects/heroes-spa-react-image.jpg';
import project3 from '../../../public/images/projects/gifs-spa-react-image.jpg';
import project4 from '../../../public/images/projects/kobbox-mvc-image.jpg';
import ProjectCard from '@/components/Projects/ProjectCard';
import FeaturedProyectCard from '@/components/Projects/FeaturedProyectCard';

export const metadata = {
  title: "Proyectos",
  description: `Conoce algunos proyectos que muestran mi habilidad en desarrollo web.`,
};

const projects = () => {
  return (
    <>
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="La innovación reside en la imaginación"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProyectCard
                title="Portafolio web 3d"
                img={project1}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts. 
                It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your 
                local currency."
                link="https://portafolio-threejs.vercel.app/"
                github="https://github.com/UlisesSnz/portafolio-threejs"
                type="Proyecto destacado"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <ProjectCard
                title="Super Heroes SPA"
                img={project2}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts. 
                It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your 
                local currency."
                link="https://heroes-spa-ivory.vercel.app"
                github="https://github.com/UlisesSnz/heroes-spa"
                type="Mini Proyecto"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <ProjectCard
                title="Gif Universe App"
                img={project3}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts. 
                It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your 
                local currency."
                link="/"
                github="/"
                type="Mini Proyecto"
              />
            </div>

            <div className="col-span-12">
              <FeaturedProyectCard
                title="Kobbox Technologies Website"
                img={project4}
                summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts. 
                It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your 
                local currency."
                link="https://kobbox.mx/"
                github="#"
                type="Proyecto destacado"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  )
}

export default projects;
