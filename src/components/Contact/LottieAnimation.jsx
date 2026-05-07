'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = ({ animation }) => {
  return (
    <DotLottieReact
      src={animation}
      autoplay
      loop
    />
  );
};

export default LottieAnimation;
