'use client';
import { motion } from 'framer-motion';

const Skills = ({ skills }) => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center md:text-6xl xs:text-4xl md:mt-32">Habilidades</h2>
      <ul className="flex flex-wrap mt-8 justify-center">
        {skills.map((skill, id) => {
          return (
            <motion.li
              key={id}
              initial={{ opacity:0, y:200 }}
              whileInView={{ opacity:1, y:0, transition:{duration:0.5, ease:"easeInOut"} }}
              viewport={{ once:true }}
              className="font-semibold inline-block capitalize xs:text-base sm:text-lg md:text-xl text-2xl xs:py-2
              sm:py-3 lg:py-4 py-5 xs:px-4 sm:px-6 lg:px-8 px-12 border-2 border-solid border-dark dark:border-light
              rounded xs:mr-3 xs:mb-3 md:mr-4 md:mb-4 mr-6 mb-6 hover:scale-105 transition-all ease duration-200
              cursor-pointer dark:font-normal"
            >
              {skill}
            </motion.li>
          );
        })}
      </ul>
    </>
  )
}

export default Skills;
