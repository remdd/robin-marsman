"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { getAssetPath } from "@/utils/paths";
import { getTransformOrigin } from "./utils";
import { useTranslationAnimation } from "./useTranslationAnimation";
import {
  useImageVariant,
  getOptimizedImagePath,
  getFallbackImagePath,
} from "./useResponsiveImages";
import {
  BASE_IMAGE_SIZE,
  FADE_IN_TRANSITION,
  FADE_OUT_TRANSITION,
} from "./config";
import { useAnimationPreferences } from "../../hooks";
import type { CarouselImageProps } from "./types";
import classNames from "classnames";

/**
 * Individual carousel image component with corner-based scaling, positioning, rotation, and translation
 * Structure: position-wrapper > translation-wrapper > scale-wrapper (corner origin) > rotation-wrapper (center origin) > image
 * Optimized with React.memo and useMemo for performance
 * Respects user's reduced motion preferences for accessibility
 */
export const CarouselImage: React.FC<CarouselImageProps> = React.memo(
  ({ imageState, alt, className = "" }) => {
    const animationPrefs = useAnimationPreferences();
    const imageVariant = useImageVariant();

    // Safety check for scale factor
    const safeFactor = useMemo(
      () => Math.max(1, Math.min(10, imageState.scaleFactor || 1)),
      [imageState.scaleFactor]
    );

    // Get current translation offset from animation hook
    const translationOffset = useTranslationAnimation(imageState);

    // Get optimized image source based on current variant
    const optimizedImageSrc = useMemo(() => {
      // Extract image number from src path (e.g., "/img/mars/1.jpg" -> 1)
      const imageNumber = parseInt(
        imageState.src.split("/").pop()?.split(".")[0] || "1"
      );
      return getOptimizedImagePath(imageNumber, imageVariant);
    }, [imageState.src, imageVariant]);

    // Memoize position calculations to avoid recalculation on every render
    const positionTransform = useMemo(() => {
      switch (imageState.position) {
        case "top-left":
          return { translateX: "0px", translateY: "0px" };
        case "top-right":
          return {
            translateX: `calc(100vw - ${BASE_IMAGE_SIZE}px)`,
            translateY: "0px",
          };
        case "bottom-left":
          return {
            translateX: "0px",
            translateY: `calc(100vh - ${BASE_IMAGE_SIZE}px)`,
          };
        case "bottom-right":
          return {
            translateX: `calc(100vw - ${BASE_IMAGE_SIZE}px)`,
            translateY: `calc(100vh - ${BASE_IMAGE_SIZE}px)`,
          };
        default:
          return { translateX: "0px", translateY: "0px" };
      }
    }, [imageState.position]);

    // Memoize transform origin for corner-based scaling
    const transformOrigin = useMemo(
      () => getTransformOrigin(imageState.position),
      [imageState.position]
    );

    // Memoize styles to prevent unnecessary recalculations
    // Use fade-in transition when opacity > 0 (fading in), fade-out when opacity === 0 (fading out)
    // For reduced motion, use gentler, slower transitions
    const containerStyle = useMemo(
      () => ({
        opacity: imageState.opacity,
        transition: animationPrefs.prefersReducedMotion
          ? `opacity ${Math.min(animationPrefs.maxSafeDuration * 20, 12000)}ms ease` // Slow, gentle fade (max 12s)
          : imageState.opacity > 0
            ? FADE_IN_TRANSITION
            : FADE_OUT_TRANSITION,
        zIndex: 0,
        overflow: "hidden",
      }),
      [
        imageState.opacity,
        animationPrefs.prefersReducedMotion,
        animationPrefs.maxSafeDuration,
      ]
    );

    const positionStyle = useMemo(
      () => ({
        position: "absolute" as const,
        top: "0",
        left: "0",
        transform: `translate(${positionTransform.translateX}, ${positionTransform.translateY})`,
      }),
      [positionTransform.translateX, positionTransform.translateY]
    );

    const translationStyle = useMemo(
      () => ({
        transform: `translate3d(${-translationOffset.x}px, ${-translationOffset.y}px, 0)`,
      }),
      [translationOffset.x, translationOffset.y]
    );

    const scaleStyle = useMemo(
      () => ({
        width: `${BASE_IMAGE_SIZE}px`,
        height: `${BASE_IMAGE_SIZE}px`,
        transform: `scale(${safeFactor})`,
        transformOrigin: transformOrigin,
      }),
      [safeFactor, transformOrigin]
    );

    const rotationStyle = useMemo(
      () => ({
        width: "100%",
        height: "100%",
        // Disable rotation for reduced motion users
        transform: animationPrefs.disableMotion
          ? "rotate(0deg)"
          : `rotate(${imageState.rotation}deg)`,
        transformOrigin: "center center",
      }),
      [imageState.rotation, animationPrefs.disableMotion]
    );

    const imageStyle = useMemo(
      () => ({
        objectFit: "cover" as const,
        width: "100%",
        height: "100%",
      }),
      []
    );

    return (
      <div
        className={classNames("absolute inset-0", className)}
        style={containerStyle}
      >
        {/* Position wrapper - places image at corner */}
        <div style={positionStyle}>
          {/* Translation wrapper - animated movement away from corner */}
          <div style={translationStyle}>
            {/* Scale wrapper - scales from the positioned corner */}
            <div style={scaleStyle}>
              {/* Rotation wrapper - rotates from center of scaled image */}
              <div style={rotationStyle}>
                <Image
                  src={getAssetPath(optimizedImageSrc)}
                  alt={alt}
                  width={BASE_IMAGE_SIZE}
                  height={BASE_IMAGE_SIZE}
                  priority={imageState.opacity > 0}
                  className="saturate-110 hue-rotate-345 contrast-125"
                  style={imageStyle}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CarouselImage.displayName = "CarouselImage";
