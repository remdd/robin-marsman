"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useAnimationPreferences } from "@/hooks";
import classNames from "classnames";

interface PhotoImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  /** Optional sizes attribute for responsive image loading. Defaults to the image's intrinsic width. */
  sizes?: string;
}

export function PhotoImage({
  src,
  alt,
  className = "",
  sizes,
}: PhotoImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationPrefs = useAnimationPreferences();

  // Compute aspect ratio from static image data
  const aspectRatio = src.width / src.height;

  // Default sizes to intrinsic width - tells browser image won't exceed this size
  const imageSizes = sizes ?? `${src.width}px`;

  const transitionClasses = animationPrefs.prefersReducedMotion
    ? ""
    : "transition-opacity duration-500 ease-out";

  // Check if image is already loaded on mount (can happen with cached images)
  useEffect(() => {
    const img = imageRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, []);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div
      className={classNames("relative mb-8", className)}
      style={{ aspectRatio }}
    >
      {/* Placeholder/skeleton - always in DOM, fades out when image loads */}
      <div
        className={classNames(
          "absolute inset-0 rounded-lg border-2 border-white/20 bg-gray-800/40 shadow-xl",
          transitionClasses,
          imageLoaded ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      />

      {/* Actual image with Next.js blur placeholder for smooth loading */}
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        sizes={imageSizes}
        placeholder="blur"
        className={classNames(
          "rounded-lg border-2 border-white object-cover shadow-xl",
          transitionClasses,
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleLoad}
        priority
      />
    </div>
  );
}
