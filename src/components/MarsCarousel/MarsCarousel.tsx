"use client";

import React, { useState, useEffect } from "react";
import { CarouselImage } from "./CarouselImage";
import { useCarouselCycle } from "./useCarouselCycle";
import { DEFAULT_CONFIG } from "./config";
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
