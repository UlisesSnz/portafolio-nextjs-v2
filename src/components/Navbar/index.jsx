'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRoot } from 'react-dom/client';
import Logo from './Logo';
import { MoonIcon, SunIcon } from '../Shared/Icons';
import { motion } from 'framer-motion';
import useThemeSwitcher from '../Hooks/useThemeSwitcher';
import CustomLink from './CustomLink';
import CustomMobileLink from './CustomMobileLink';
import SocialLinks from './SocialLinks';
import MobileSocialLinks from './MobileSocialLinks';

const Navbar = () => {
    const [mode, setMode] = useThemeSwitcher();
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef(null);
    const router = useRouter();

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const modalContainer = document.getElementById('modal');;
        if (isOpen) {
            document.body.classList.add('overflow-y-hidden');
            if (!rootRef.current) {
                rootRef.current = createRoot(modalContainer);
            }
            const modalDiv = (
                <div 
                    className="z-100 fixed top-0 left-0 bottom-0 right-0 inline-block bg-dark/50 font-os backdrop-blur-[2px]"
                    onClick={handleClick}
                />
            );
            rootRef.current.render(modalDiv);
        } else{
            document.body.classList.remove('overflow-y-hidden');
            if (rootRef.current) {
                rootRef.current.unmount();
                rootRef.current = null;
            }
        } 
        return () => {
            document.body.classList.remove('overflow-y-hidden');
            if (rootRef.current) {
                rootRef.current.unmount();
                rootRef.current = null;
            }
        };
    }, [isOpen, handleClick]);

    useEffect(() => {
        const handleHashChange = () => {
          if (window.location.hash) {
            router.push(window.location.pathname + window.location.hash);
          }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
          window.removeEventListener('hashchange', handleHashChange);
        };
    }, [router]);

    return (
        <header
            className="w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light z-10 lg:px-16 md:px-12 sm:px-8"
        >

            <button className="flex-col justify-center items-center hidden lg:flex mt-2" onClick={handleClick} aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>

            <div className="w-full flex justify-between items-center lg:hidden">
                <nav>
                    <CustomLink href="/" title="Inicio" className="mr-4" />
                    <CustomLink href="/contact" title="Contactar" className="mx-4" />
                    <CustomLink href="/projects" title="Proyectos" className="mx-4" />
                    <CustomLink href="/blog" title="Blog" className="ml-4" />
                </nav>
            
                <nav className="flex items-center justify-center flex-wrap">
                    <SocialLinks />

                    <button
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        aria-label={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
                        className={`w-7 ml-3 flex items-center justify-center rounded-full p-1
                                ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
                        `}
                    >
                        {
                            mode === 'dark'
                            ? <SunIcon className={"fill-dark"} />
                            : <MoonIcon className={"fill-dark"} />
                        }
                    </button>

                </nav>
            </div>

            {
                isOpen ?
            
                <motion.div
                    initial={{scale:0, opacity:0, x: '-50%', y: '-50%'}}
                    animate={{scale:1, opacity:1}}
                    className="min-w-[80vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-12"
                >
                    <nav className="flex items-center flex-col justify-center">
                        <CustomMobileLink href="/" title="Inicio" toggle={handleClick} />
                        <CustomMobileLink href="/contact" title="Contactar" toggle={handleClick} />
                        <CustomMobileLink href="/projects" title="Proyectos" toggle={handleClick} />
                        <CustomMobileLink href="/blog" title="Blog" toggle={handleClick} />
                    </nav>
                
                    <nav className="flex items-center justify-center flex-wrap mt-2">
                        <MobileSocialLinks />

                        <button
                            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                            aria-label={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
                            className={`ml-3 sm:ml-1 flex items-center justify-center rounded-full p-1
                                ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
                            `}
                        >
                            {
                                mode === 'dark'
                                ? <SunIcon className={"fill-dark"} />
                                : <MoonIcon className={"fill-dark"} />
                            }
                        </button>

                    </nav>
                </motion.div>

                : null
            }

            <div className="absolute left-[50%] top-2 translate-x-[-50%]">
                <Logo />
            </div>
        </header>
    );
}

export default Navbar;
