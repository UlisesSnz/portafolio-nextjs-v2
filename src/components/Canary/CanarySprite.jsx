"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CANARY_ACTION_NAMES,
  DEFAULT_CANARY_SIZE,
  getCanaryActionConfig,
  getCanaryFrameSrc,
  normalizeCanaryAction,
} from "@/lib/canary/canaryActions";

let hasPreloadedCanaryFrames = false;

const CanarySprite = ({
  action = "idle",
  alt = "Canary",
  className = "",
  reducedMotion = false,
  size = DEFAULT_CANARY_SIZE,
}) => {
  const normalizedAction = normalizeCanaryAction(action);
  const config = getCanaryActionConfig(normalizedAction);
  const [frameState, setFrameState] = useState({
    action: normalizedAction,
    frameIndex: 0,
  });
  const frameIndex =
    frameState.action === normalizedAction ? frameState.frameIndex : 0;
  const displayedFrameIndex = reducedMotion ? 0 : frameIndex;
  const frameIndexes = Array.from(
    { length: config.frames },
    (_, candidateFrameIndex) => candidateFrameIndex
  );

  useEffect(() => {
    if (hasPreloadedCanaryFrames) {
      return;
    }

    hasPreloadedCanaryFrames = true;
    CANARY_ACTION_NAMES.forEach((actionName) => {
      const actionConfig = getCanaryActionConfig(actionName);

      Array.from({ length: actionConfig.frames }).forEach(
        (_, candidateFrameIndex) => {
          const image = new window.Image();

          image.src = getCanaryFrameSrc(actionName, candidateFrameIndex);
          if (typeof image.decode === "function") {
            image.decode().catch(() => {});
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    if (reducedMotion || config.frames <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setFrameState((currentState) => {
        const currentFrame =
          currentState.action === normalizedAction
            ? currentState.frameIndex
            : 0;
        const nextFrame = currentFrame + 1;

        if (nextFrame < config.frames) {
          return {
            action: normalizedAction,
            frameIndex: nextFrame,
          };
        }

        return {
          action: normalizedAction,
          frameIndex: config.loop ? 0 : currentFrame,
        };
      });
    }, 1000 / config.fps);

    return () => window.clearInterval(interval);
  }, [config.fps, config.frames, config.loop, normalizedAction, reducedMotion]);

  return (
    <span
      className={`relative block shrink-0 overflow-visible ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {frameIndexes.map((candidateFrameIndex) => {
        const isVisibleFrame = candidateFrameIndex === displayedFrameIndex;
        const frameStyle = config.frameStyles?.[candidateFrameIndex] || {};

        return (
          <Image
            key={`${normalizedAction}-${candidateFrameIndex}`}
            src={getCanaryFrameSrc(normalizedAction, candidateFrameIndex)}
            alt={isVisibleFrame ? alt : ""}
            aria-hidden={!isVisibleFrame}
            width={size}
            height={size}
            unoptimized
            draggable={false}
            className={`absolute inset-0 h-full w-full select-none object-contain ${
              isVisibleFrame ? "opacity-100" : "opacity-0"
            }`}
            sizes={`${size}px`}
            style={{
              imageRendering: "pixelated",
              ...frameStyle,
            }}
          />
        );
      })}
    </span>
  );
};

export default CanarySprite;
