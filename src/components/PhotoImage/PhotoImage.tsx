"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useAnimationPreferences } from "@/hooks";
import classNames from "classnames";

interface PhotoImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

export function PhotoImage({ src, alt, className = "" }: PhotoImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const animationPrefs = useAnimationPreferences();

  return (
    <div className={classNames("relative", className)}>
      {/* Placeholder/skeleton while loading */}
      {!imageLoaded && (
        <div
          className="mb-8 aspect-square w-full rounded-lg border-2 border-white/20 bg-gray-800/40 shadow-xl"
          aria-hidden="true"
        />
      )}

      {/* Actual image with fade-in transition */}
      <Image
        src={src}
        alt={alt}
        className={classNames(
          "mb-8 w-full rounded-lg border-2 border-white shadow-xl",
          // Respect motion preferences for transitions
          animationPrefs.prefersReducedMotion
            ? "" // No transition for reduced motion
            : "transition-opacity duration-500 ease-out", // Smooth fade for normal users
          imageLoaded ? "opacity-100" : "opacity-0",
          // Position absolute when loading to overlay the placeholder
          imageLoaded ? "relative" : "absolute left-0 top-0"
        )}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)} // Show even if there's an error
        priority
      />
    </div>
  );
}
