'use client';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '../Shared/Icons';

const MobileSocialLinks = () => {
    return(
        <>
            <motion.a
                href="https://github.com/UlisesSnz"
                target={"_blank"}
                className="w-6 mr-3 bg-light rounded-full dark:bg-dark sm:mr-1"
                aria-label="Visitar mi perfil en GitHub"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <GithubIcon />
            </motion.a>

            <motion.a
                href="https://www.linkedin.com/in/ulisessanchez"
                target={"_blank"}
                className="w-6 mx-3 sm:mx-1"
                aria-label="Visitar mi perfil en LinkedIn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <LinkedinIcon />
            </motion.a>

            <motion.a
                href="https://www.youtube.com/@ulises-snz"
                target={"_blank"}
                className="w-7 mx-3 sm:mx-1"
                aria-label="Visitar mi canal en YouTube"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <YoutubeIcon />
            </motion.a>
        </>
    )
}

export default MobileSocialLinks;
