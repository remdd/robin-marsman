"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { getAssetPath } from "@/utils/paths";
import { getTransformOrigin } from "./utils";
import { useTranslationAnimation } from "./useTranslationAnimation";
import type { CarouselImageProps } from "./types";

/**
 * Individual carousel image component with corner-based scaling, positioning, rotation, and translation
 * Structure: position-wrapper > translation-wrapper > scale-wrapper (corner origin) > rotation-wrapper (center origin) > image
 * Optimized with React.memo and useMemo for performance
 */
export const CarouselImage: React.FC<CarouselImageProps> = React.memo(
  ({ imageState, alt, className = "" }) => {
    const baseImageSize = 1920;

    // Safety check for scale factor
    const safeFactor = useMemo(
      () => Math.max(1, Math.min(10, imageState.scaleFactor || 1)),
      [imageState.scaleFactor],
    );

    // Get current translation offset from animation hook
    const translationOffset = useTranslationAnimation(imageState);

    // Memoize position calculations to avoid recalculation on every render
    const positionTransform = useMemo(() => {
      switch (imageState.position) {
        case "top-left":
          return { translateX: "0px", translateY: "0px" };
        case "top-right":
          return {
            translateX: `calc(100vw - ${baseImageSize}px)`,
            translateY: "0px",
          };
        case "bottom-left":
          return {
            translateX: "0px",
            translateY: `calc(100vh - ${baseImageSize}px)`,
          };
        case "bottom-right":
          return {
            translateX: `calc(100vw - ${baseImageSize}px)`,
            translateY: `calc(100vh - ${baseImageSize}px)`,
          };
        default:
          return { translateX: "0px", translateY: "0px" };
      }
    }, [imageState.position, baseImageSize]);

    // Memoize transform origin for corner-based scaling
    const transformOrigin = useMemo(
      () => getTransformOrigin(imageState.position),
      [imageState.position],
    );

    // Memoize styles to prevent unnecessary recalculations
    const containerStyle = useMemo(
      () => ({
        opacity: imageState.opacity,
        transition: "opacity 2s ease-in-out",
        zIndex: 0,
        overflow: "hidden",
      }),
      [imageState.opacity],
    );

    const positionStyle = useMemo(
      () => ({
        position: "absolute" as const,
        top: "0",
        left: "0",
        transform: `translate(${positionTransform.translateX}, ${positionTransform.translateY})`,
      }),
      [positionTransform.translateX, positionTransform.translateY],
    );

    const translationStyle = useMemo(
      () => ({
        transform: `translate3d(${-translationOffset.x}px, ${-translationOffset.y}px, 0)`,
      }),
      [translationOffset.x, translationOffset.y],
    );

    const scaleStyle = useMemo(
      () => ({
        width: `${baseImageSize}px`,
        height: `${baseImageSize}px`,
        transform: `scale(${safeFactor})`,
        transformOrigin: transformOrigin,
      }),
      [baseImageSize, safeFactor, transformOrigin],
    );

    const rotationStyle = useMemo(
      () => ({
        width: "100%",
        height: "100%",
        transform: `rotate(${imageState.rotation}deg)`,
        transformOrigin: "center center",
      }),
      [imageState.rotation],
    );

    const imageStyle = useMemo(
      () => ({
        objectFit: "cover" as const,
        width: "100%",
        height: "100%",
      }),
      [],
    );

    return (
      <div className={`absolute inset-0 ${className}`} style={containerStyle}>
        {/* Position wrapper - places image at corner */}
        <div style={positionStyle}>
          {/* Translation wrapper - animated movement away from corner */}
          <div style={translationStyle}>
            {/* Scale wrapper - scales from the positioned corner */}
            <div style={scaleStyle}>
              {/* Rotation wrapper - rotates from center of scaled image */}
              <div style={rotationStyle}>
                <Image
                  src={getAssetPath(imageState.src)}
                  alt={alt}
                  width={baseImageSize}
                  height={baseImageSize}
                  priority={imageState.opacity > 0}
                  className="contrast-125 saturate-100 hue-rotate-350"
                  style={imageStyle}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CarouselImage.displayName = "CarouselImage";
