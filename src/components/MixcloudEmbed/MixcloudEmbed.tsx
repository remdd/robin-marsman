"use client";

import { useState } from "react";

interface MixcloudEmbedProps {
  src: string;
  className?: string;
}

export function MixcloudEmbed({ src, className = "" }: MixcloudEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`max-w-3xl w-full mt-16 relative ${className}`}>
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Mixcloud iframe */}
      <iframe
        width="100%"
        height="120"
        src={src}
        allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;"
        onLoad={handleLoad}
        className="rounded"
      />
    </div>
  );
}
