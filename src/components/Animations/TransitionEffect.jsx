'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export const TransitionEffect = () => {
  const router = useRouter();

    // useEffect(() => {
    //   router.beforePopState(state => {
    //     state.options.scroll = false;
    //     return true;
    //   });
    // }, [router]);

  return (
    <>
      {/* <Script>{`window.history.scrollRestoration = "manual"`}</Script> */}
      <Script
        id="scroll-restoration-script"
        dangerouslySetInnerHTML={{__html: `window.history.scrollRestoration = "manual";`}}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-dark"
        initial={{ x:'100%', width:'100%' }}
        animate={{ x:'0%', width:'0%' }}
        exit={{ x:['0%', '100%'], width:['0%', '100%'] }}
        transition={{ duration:0.4, ease:'easeInOut' }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-light"
        initial={{ x:'100%', width:'100%' }}
        animate={{ x:'0%', width:'0%' }}
        transition={{ delay:0.2, duration:0.4, ease:'easeInOut' }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-dark"
        initial={{ x:'100%', width:'100%' }}
        animate={{ x:'0%', width:'0%' }}
        transition={{ delay:0.4, duration:0.4, ease:'easeInOut' }}
      />
    </>
  )
}

export default TransitionEffect;