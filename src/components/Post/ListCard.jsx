'use client';
import { motion } from 'framer-motion';
import MovingImg from '../Blog/MovingImg';

const ListCard = ({ title, date, img, link }) => {
    return (
      <motion.li
        initial={{ opacity:0, y:200 }}
        whileInView={{ opacity:1, y:0, transition:{duration:0.5, ease:"easeInOut"} }}
        viewport={{ once:true }}
        className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center
        justify-between bg-light text-dark first:mt-0 border border-solid border-dark
        border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light
        sm:flex-col"
      >
        <MovingImg
          title={title}
          img={img}
          link={link}
        />
        <span className="text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm">{date}</span>
      </motion.li>
    )
}

export default ListCard;
