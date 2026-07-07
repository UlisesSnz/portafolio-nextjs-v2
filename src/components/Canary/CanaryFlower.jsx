"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CanaryFlower = ({
  position = 0.5,
  reducedMotion = false,
  size = 42,
}) => {
  return (
    <div
      aria-hidden="true"
      className="canary-flower-anchor"
      style={{
        "--canary-flower-position": position,
        "--canary-flower-size": `${size}px`,
      }}
    >
      <DotLottieReact
        src="/canary/flower.lottie"
        autoplay={!reducedMotion}
        loop={false}
      />
    </div>
  );
};

export default CanaryFlower;
