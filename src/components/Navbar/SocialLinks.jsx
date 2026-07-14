'use client';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '../Shared/Icons';
import { useTranslations } from 'next-intl';

const SocialLinks = () => {
    const t = useTranslations('Navigation');
    return(
        <>
            <motion.a
                href="https://github.com/UlisesSnz"
                target={"_blank"}
                className="w-6 mr-3"
                aria-label={t('visitGitHub')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <GithubIcon />
            </motion.a>

            <motion.a
                href="https://www.linkedin.com/in/ulisessanchez"
                target={"_blank"}
                className="w-5 mx-3"
                aria-label={t('visitLinkedIn')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <LinkedinIcon />
            </motion.a>

            <motion.a
                href="https://www.youtube.com/@ulises-snz"
                target={"_blank"}
                className="w-6 mx-3"
                aria-label={t('visitYouTube')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
            >
                <YoutubeIcon />
            </motion.a>
        </>
    )
}

export default SocialLinks;
