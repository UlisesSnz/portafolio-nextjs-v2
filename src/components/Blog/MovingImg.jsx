import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const imgRef = useRef(null);
  
    function handleMouse(e) {
      imgRef.current.style.display = "inline-block";
      x.set(e.pageX);
      y.set(-10);
    }
  
    function handleMouseLeave(e) {
      imgRef.current.style.display = "none";
      x.set(0);
      y.set(0);
    }
  
    return (
      <Link href={link} target="_blank"
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="capitalize text-xl font-semibold hover:underline">{title}</h2>
        <FramerImage
          style={{ x:x, y:y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity:1, transition:{duration:0.2} }}
          ref={imgRef}
          src={img} alt={title}
          className="z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden"
        />
      </Link>
    )
}

export default MovingImg;