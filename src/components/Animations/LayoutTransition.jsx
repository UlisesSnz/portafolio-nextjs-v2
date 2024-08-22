'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const onExitComplete = () => {
    window.scrollTo({ top: 0 });
};

function usePreviousValue(value) {
    const prevValue = useRef();
  
    useEffect(() => {
        prevValue.current = value;
        return () => {
            prevValue.current = undefined;
        };
    }, [value]);
  
    return prevValue.current;
}

function FrozenRouter(props) {
    const context = useContext(LayoutRouterContext);
    const prevContext = usePreviousValue(context) || null;

    const segment = useSelectedLayoutSegment();
    const prevSegment = usePreviousValue(segment);

    const changed =
        segment !== prevSegment && segment !== undefined && prevSegment !== undefined;

    return (
        <LayoutRouterContext.Provider value={changed ? prevContext : context}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

function LayoutTransition({ children }) {
    const segment = useSelectedLayoutSegment();
  
    return (
        <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
            <motion.div
                key={segment}
            >
                <FrozenRouter>
                    {children}
                </FrozenRouter>
            </motion.div>
            <motion.div
                key={`exit-animation-${segment}`}
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
        </AnimatePresence>
    );
}

export default LayoutTransition;