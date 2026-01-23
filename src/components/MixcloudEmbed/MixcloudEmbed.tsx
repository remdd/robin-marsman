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
    <div className={classNames("max-w-3xl w-full mb-16 relative", className)}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
          {animationPrefs.prefersReducedMotion ? (
            /* Static loading indicator for reduced motion */
            <div className="w-2 h-2 bg-white rounded-full opacity-75" />
          ) : (
            /* Spinning loader for regular motion */
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
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
        className="rounded shadow-lg bg-black"
      />
    </div>
  );
}
