"use client";

import { useState } from "react";
import classNames from "classnames";
import { useAnimationPreferences } from "@/hooks";

interface BandcampEmbedProps {
  src: string;
  albumTitle: string;
  className?: string;
}

export function BandcampEmbed({
  src,
  albumTitle,
  className = "",
}: BandcampEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const animationPrefs = useAnimationPreferences();

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={classNames(
        "relative mb-16 h-[940px] w-full max-w-[640px]",
        className
      )}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-50">
          {animationPrefs.prefersReducedMotion ? (
            /* Static loading indicator for reduced motion */
            <div className="h-2 w-2 rounded-full bg-white opacity-75" />
          ) : (
            /* Spinning loader for regular motion */
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
          )}
        </div>
      )}

      {/* Bandcamp iframe */}
      <iframe
        className="h-full w-full rounded bg-white shadow-lg"
        src={src}
        seamless
        onLoad={handleLoad}
        title={albumTitle}
      />
    </div>
  );
}
