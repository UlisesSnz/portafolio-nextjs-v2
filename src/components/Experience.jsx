import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lilcon from './Lilcon';

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null)

  return (
    <li ref={ref} className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]">
      
      <Lilcon reference={ref} />

      <motion.div initial={{ y:50 }} whileInView={{ y:0 }} transition={{ duration:0.5, type:"spring", }}>
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">
          {work}
        </p>
      </motion.div>
    </li>
  )
}

const Experience = () => {
  const ref = useRef(null);
  
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });
  
  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experiencia
      </h2>

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">

        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light
            md:w-[2px] md:left-[30px] xs:left-[20px]"
          />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Freelancer"
            company="Creativa Innova Tech"
            // companyLink="www.google.com"
            time="2022-Present"
            address="México"
            work="Me desenvolví de manera independiente como freelancer, enfocado en proporcionar servicios
            de mantenimiento y desarrollo de sitios web, así como en la implementación de nuevas funcionalidades
            para mejorar la experiencia del usuario. Además, tuve la oportunidad de crear un ecommerce desde cero,
            proporcionando a los clientes una plataforma sólida para su negocio en línea. Durante este tiempo,
            además de trabajar en proyectos concretos, realice implementaciones de Google Analytics para mejorar
            la analítica web de mis clientes.
            Asimismo, aproveché la oportunidad para expandir mis habilidades, sumergiéndome en el aprendizaje
            de tecnologías modernas de desarrollo web e inteligencia artificial"
          />

          <Details
            position="Desarrollador Web"
            company="Kobbox Technologies"
            companyLink="https://kobbox.mx/"
            time="2021-2022"
            address="México"
            work="Trabajé en colaboración con un pequeño equipo para desarrollar el sitio web
            corporativo de la empresa. Este proyecto no solo implicó la creación de un diseño web
            atractivo y funcional, sino que también incorporamos un sistema de gestión de contenido
            (CMS) basado en Laravel, siguiendo la arquitectura MVC."
          />
        </ul>
      </div>
    </div>
  )
}

export default Experience;
