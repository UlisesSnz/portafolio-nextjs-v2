'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FramerImage = motion(Image);

const FeaturedArticleCard = ({img, title, categories, summary, link, date}) => {
    return (
      <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
  
        <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
          rounded-br-3xl"  
        />
        <Link href={link} className="w-full inline-block cursor-pointer overflow-hidden rounded-lg">
          <FramerImage src={img.image} alt={title} className="w-full h-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            width={img.imageWidth}
            height={img.imageHeight}
          />
        </Link>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-primary font-semibold dark:text-primaryDark">{date}</span>
        </div>
        <Link href={link}>
          <h2 className="capitalize text-2xl font-bold my-2 mt-2 hover:underline xs:text-lg ">{title}</h2>
        </Link>
        <p className="text-sm mb-2">{summary}</p>
          {categories &&
            categories.map(categy => (
              <Link
                key={categy.slug}
                href={`/search/${categy.slug}`}
                className="hover:underline underline-offset-2 capitalize text-primary font-semibold dark:text-primaryDark text-sm">
                <span>
                  #{categy.name}
                </span>
              </Link>
            ))
          }
      </li>
    )
}

export default FeaturedArticleCard;
