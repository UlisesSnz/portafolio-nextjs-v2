'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GithubIcon } from '../Shared/Icons';

const FramerImage = motion(Image);

const FeaturedProyectCard = ({type, title, slug, summary, img, link, github}) =>{
    return(
      <article className="w-full flex items-center justify-between relative rounded-br-2xl
        rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light
        lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
      >
        
        <div className="absolute top-0 -right-3 -z-10 w-[100.8%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light
          rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]"  
        />
  
        <Link href={`/projects/${slug}`} className="w-1/2 cursor-pointer overflow-hidden rounded-xl lg:w-full">
          <FramerImage src={img.image} alt={img.alt} className="w-full h-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            width={img.imageWidth}
            height={img.imageHeight}
          />
        </Link>
  
        <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
          <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">{type}</span>
          <Link href={`/projects/${slug}`} className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">{title}</h2>
          </Link>
          <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">{summary}</p>
          <div className="w-full mt-2 flex items-center justify-between">
            <Link
              href={link}
              target="_blank"
              className="text-lg font-semibold underline sm:px-4 sm:text-base"
            >
              Ver Proyecto
            </Link>
            <Link href={github} target="_blank" className="w-8 md:w-6">
              {" "}
              <GithubIcon />{" "}
            </Link>
          </div>
        </div>
      </article>
    )
}

export default FeaturedProyectCard;
