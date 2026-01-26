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
          className="w-80 h-80 bg-gray-800/40 rounded-lg mb-8 shadow-xl border-2 border-white/20"
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
          "rounded-lg mb-8 w-80 shadow-xl border-2 border-white",
          // Respect motion preferences for transitions
          animationPrefs.prefersReducedMotion 
            ? "" // No transition for reduced motion
            : "transition-opacity duration-500 ease-out", // Smooth fade for normal users
          imageLoaded ? "opacity-100" : "opacity-0",
          // Position absolute when loading to overlay the placeholder
          imageLoaded ? "relative" : "absolute top-0 left-0"
        )}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)} // Show even if there's an error
        priority
        sizes="320px"
      />
    </div>
  );
}