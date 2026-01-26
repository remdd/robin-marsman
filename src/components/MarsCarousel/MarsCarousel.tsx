"use client";

import React, { useState, useEffect } from "react";
import { CarouselImage } from "./CarouselImage";
import { useCarouselCycle } from "./useCarouselCycle";
import { useImagePreloading } from "./useImagePreloading";
import { useImageVariant } from "./useResponsiveImages";
import { DEFAULT_CONFIG, CAROUSEL_IMAGES } from "./config";
import classNames from "classnames";

interface MarsCarouselProps {
  className?: string;
}

/**
 * Dynamic Mars background carousel component
 * Cycles through Mars images with random rotation and positioning
 */
export const MarsCarousel: React.FC<MarsCarouselProps> = ({
  className = "",
}) => {
  const [isClient, setIsClient] = useState(false);
  const { currentImage, nextImage, phase, isResizing } =
    useCarouselCycle(DEFAULT_CONFIG);
  
  const imageVariant = useImageVariant();
  
  // Get current image index for preloading
  const currentImageIndex = currentImage ? CAROUSEL_IMAGES.findIndex(
    (img) => img === currentImage.src
  ) : 0;
  
  // Preload upcoming images for better performance
  useImagePreloading(
    currentImageIndex,
    CAROUSEL_IMAGES.length,
    imageVariant,
    isClient && !isResizing
  );

  // Ensure component only renders after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={classNames("absolute inset-0 overflow-hidden", className)}
      style={{ zIndex: 0 }}
    >
      {/* Hide all images during resize */}
      {!isResizing && (
        <>
          {/* Current image during display and fade-out phases */}
          {currentImage && phase !== "fading-in" && (
            <CarouselImage imageState={currentImage} alt="Mars background" />
          )}

          {/* Next image during fade-in phase */}
          {phase === "fading-in" && (
            <CarouselImage imageState={nextImage} alt="Mars background" />
          )}
        </>
      )}
    </div>
  );
};
