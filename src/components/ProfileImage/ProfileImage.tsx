"use client";

import { useState } from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import { useAnimationPreferences } from "@/hooks";
import classNames from "classnames";

interface ProfileImageProps {
  className?: string;
}

export function ProfileImage({ className = "" }: ProfileImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const animationPrefs = useAnimationPreferences();

  return (
    <div className={classNames("relative", className)}>
      {/* Placeholder/skeleton while loading */}
      {!imageLoaded && (
        <div
          className="mb-8 h-80 w-80 rounded-lg border-2 border-white/20 bg-gray-800/40 shadow-xl"
          aria-hidden="true"
        />
      )}

      {/* Actual image with fade-in transition */}
      <Image
        src={getAssetPath("/img/robin-marsman.jpg")}
        alt="Robin Marsman"
        width={800}
        height={800}
        className={classNames(
          "mb-8 w-80 rounded-lg border-2 border-white shadow-xl",
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
        sizes="320px"
      />
    </div>
  );
}
