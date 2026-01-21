"use client";

import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import { getTransformOrigin } from "./utils";
import type { CarouselImageProps } from "./types";

/**
 * Individual carousel image component with corner-based scaling, positioning, and rotation
 * Structure: position-wrapper > scale-wrapper (corner origin) > rotation-wrapper (center origin) > image
 */
export const CarouselImage: React.FC<CarouselImageProps> = ({
  imageState,
  alt,
  className = "",
}) => {
  const baseImageSize = 1920;
  
  // Safety check for scale factor
  const safeFactor = Math.max(1, Math.min(10, imageState.scaleFactor || 1));
  
  // Original simple positioning logic - no complex offset calculations
  let translateX = "0px";
  let translateY = "0px";

  switch (imageState.position) {
    case "top-left":
      translateX = "0px";
      translateY = "0px";
      break;
    case "top-right":
      translateX = `calc(100vw - ${baseImageSize}px)`;
      translateY = "0px";
      break;
    case "bottom-left":
      translateX = "0px";
      translateY = `calc(100vh - ${baseImageSize}px)`;
      break;
    case "bottom-right":
      translateX = `calc(100vw - ${baseImageSize}px)`;
      translateY = `calc(100vh - ${baseImageSize}px)`;
      break;
  }

  // Get transform origin for true corner-based scaling
  const transformOrigin = getTransformOrigin(imageState.position);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity: imageState.opacity,
        transition: "opacity 2s ease-in-out",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Position wrapper - places image at corner */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          transform: `translate(${translateX}, ${translateY})`,
        }}
      >
        {/* Scale wrapper - scales from the positioned corner */}
        <div
          style={{
            width: `${baseImageSize}px`,
            height: `${baseImageSize}px`,
            transform: `scale(${safeFactor})`,
            transformOrigin: transformOrigin,
          }}
        >
          {/* Rotation wrapper - rotates from center of scaled image */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${imageState.rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            <Image
              src={getAssetPath(imageState.src)}
              alt={alt}
              width={baseImageSize}
              height={baseImageSize}
              priority={imageState.opacity > 0}
              className="contrast-125 saturate-100 hue-rotate-350"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
};
