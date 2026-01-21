"use client";

import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import type { CarouselImageProps } from "./types";

/**
 * Individual carousel image component with rotation and positioning
 * Fixed approach: separate rotation and positioning transforms
 */
export const CarouselImage: React.FC<CarouselImageProps> = ({
  imageState,
  alt,
  className = "",
}) => {
  // Calculate positioning based on corner selection
  let translateX = "0px";
  let translateY = "0px";

  switch (imageState.position) {
    case "top-left":
      translateX = "0px";
      translateY = "0px";
      break;
    case "top-right":
      translateX = "calc(100vw - 1920px)";
      translateY = "0px";
      break;
    case "bottom-left":
      translateX = "0px";
      translateY = "calc(100vh - 1920px)";
      break;
    case "bottom-right":
      translateX = "calc(100vw - 1920px)";
      translateY = "calc(100vh - 1920px)";
      break;
  }

  // Debug logging
  console.log("Image positioning:", {
    src: imageState.src,
    rotation: imageState.rotation,
    position: imageState.position,
    translateX,
    translateY,
    opacity: imageState.opacity,
  });

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
      {/* Positioning wrapper */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          transform: `translate(${translateX}, ${translateY})`,
        }}
      >
        {/* Rotation wrapper */}
        <div
          style={{
            width: "1920px",
            height: "1920px",
            transform: `rotate(${imageState.rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <Image
            src={getAssetPath(imageState.src)}
            alt={alt}
            width={1920}
            height={1920}
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
  );
};
