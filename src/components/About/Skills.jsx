'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Skills = ({ skills }) => {
  const t = useTranslations('About');
  return (
    <>
      <h2 className="font-bold text-8xl md:text-6xl xs:text-4xl mt-64 mb-16 md:mt-32 w-full text-center">
        {t('skills')}
      </h2>
      <ul className="flex flex-wrap mt-8 justify-center">
        {skills.map((skill, id) => {
          return (
            <motion.li
              key={id}
              initial={{ opacity:0, y:200 }}
              whileInView={{ opacity:1, y:0, transition:{duration:0.5, ease:"easeInOut"} }}
              whileHover={{ scale:1.05, transition: { duration:0.2, ease:"easeOut" } }}
              viewport={{ once:true }}
              className="font-semibold inline-block capitalize text-2xl xs:text-base sm:text-lg md:text-xl xs:py-2
              sm:py-3 lg:py-4 py-5 xs:px-4 sm:px-6 lg:px-8 px-12 border-2 border-solid border-dark dark:border-light
              rounded xs:mr-3 xs:mb-3 md:mr-4 md:mb-4 mr-6 mb-6 cursor-pointer dark:font-normal"
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
