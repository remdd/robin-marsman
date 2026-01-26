"use client";

import { useState } from "react";
import classNames from "classnames";
import { useAnimationPreferences } from "@/hooks";

interface MixcloudEmbedProps {
  src: string;
  className?: string;
}

export function MixcloudEmbed({ src, className = "" }: MixcloudEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const animationPrefs = useAnimationPreferences();

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={classNames("relative mb-16 w-full max-w-3xl", className)}>
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

      {/* Mixcloud iframe */}
      <iframe
        width="100%"
        height="120"
        src={src}
        allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;"
        onLoad={handleLoad}
        className="rounded bg-black shadow-lg"
      />
    </div>
  );
}
