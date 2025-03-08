'use client';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const LottieAnimation = ({ animation }) => {
  return (
    <DotLottiePlayer
      src={animation}
      autoplay
      loop
    >
       
    </DotLottiePlayer>
  );
};

export default LottieAnimation;
