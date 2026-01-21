import type { Rotation, CornerPosition } from "./types";

/**
 * Generates a random rotation angle in 90-degree increments
 */
export const getRandomRotation = (): Rotation => {
  const rotations: Rotation[] = [0, 90, 180, 270];
  return rotations[Math.floor(Math.random() * rotations.length)];
};

/**
 * Generates a random corner position for image placement
 */
export const getRandomCorner = (): CornerPosition => {
  const corners: CornerPosition[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];
  return corners[Math.floor(Math.random() * corners.length)];
};

/**
 * Calculates the CSS transform values for positioning a rotated image
 * Simple approach: position the image center at each corner, then let overflow handle the rest
 */
export const getCornerTransform = (
  corner: CornerPosition,
  rotation: Rotation,
): string => {
  // Simple positioning: place image so it originates from the specified corner
  switch (corner) {
    case "top-left":
      return "translate(0px, 0px)";
    case "top-right":
      return "translate(-1920px, 0px)";
    case "bottom-left":
      return "translate(0px, -1920px)";
    case "bottom-right":
      return "translate(-1920px, -1920px)";
    default:
      return "translate(0px, 0px)";
  }
};

/**
 * Creates a complete CSS transform string combining rotation and position
 */
export const getCombinedTransform = (
  rotation: Rotation,
  position: CornerPosition,
): string => {
  const positionTransform = getCornerTransform(position, rotation);
  return `rotate(${rotation}deg) ${positionTransform}`;
};

/**
 * Gets the next image index in a circular array
 */
export const getNextImageIndex = (
  currentIndex: number,
  totalImages: number,
): number => {
  return (currentIndex + 1) % totalImages;
};

/**
 * Calculates the required scale factor to ensure minimum 50% viewport overflow
 * Only scales up - never scales down from base size
 */
export const calculateRequiredScale = (
  viewportWidth: number,
  viewportHeight: number,
  baseImageSize: number = 1920,
): number => {
  // Safety checks for invalid inputs
  if (
    !viewportWidth ||
    !viewportHeight ||
    viewportWidth <= 0 ||
    viewportHeight <= 0
  ) {
    console.warn("Invalid viewport dimensions:", {
      viewportWidth,
      viewportHeight,
    });
    return 1;
  }

  // Calculate current overflow with base image size
  const currentOverflowX = baseImageSize - viewportWidth;
  const currentOverflowY = baseImageSize - viewportHeight;

  // Required overflow is 50% of viewport dimensions
  const requiredOverflowX = viewportWidth * 0.5;
  const requiredOverflowY = viewportHeight * 0.5;

  // Only scale up if current overflow is insufficient
  const scaleNeededForX =
    currentOverflowX < requiredOverflowX
      ? (viewportWidth + requiredOverflowX) / baseImageSize
      : 1;
  const scaleNeededForY =
    currentOverflowY < requiredOverflowY
      ? (viewportHeight + requiredOverflowY) / baseImageSize
      : 1;

  // Use the larger scale requirement to satisfy both axes
  const requiredScale = Math.max(1, scaleNeededForX, scaleNeededForY);

  // Safety check for invalid scale factors
  if (!isFinite(requiredScale) || requiredScale <= 0) {
    console.warn("Invalid scale factor calculated:", {
      requiredScale,
      viewportWidth,
      viewportHeight,
    });
    return 1;
  }

  return requiredScale;
};

/**
 * Gets the appropriate transform-origin based on corner position
 * This ensures scaling occurs from the positioned corner
 */
export const getTransformOrigin = (corner: CornerPosition): string => {
  const origins: Record<CornerPosition, string> = {
    "top-left": "top left",
    "top-right": "top right",
    "bottom-left": "bottom left",
    "bottom-right": "bottom right",
  };
  return origins[corner];
};

/**
 * Calculates the scaled image dimensions
 */
export const getScaledDimensions = (
  baseSize: number,
  scaleFactor: number,
): { width: number; height: number } => {
  const scaledSize = Math.round(baseSize * scaleFactor);
  return {
    width: scaledSize,
    height: scaledSize,
  };
};

/**
 * Generate random translation vector within corner's 90° range
 * Corner movement directions:
 * - top-left: 0° to 90° (East to South)
 * - top-right: 90° to 180° (South to West)
 * - bottom-left: 270° to 360° (North to East)
 * - bottom-right: 180° to 270° (West to North)
 */
export const getRandomTranslationVector = (
  corner: CornerPosition,
): { x: number; y: number } => {
  const ranges = {
    "top-left": { minAngle: 0, maxAngle: 90 },
    "top-right": { minAngle: 90, maxAngle: 180 },
    "bottom-left": { minAngle: 270, maxAngle: 360 },
    "bottom-right": { minAngle: 180, maxAngle: 270 },
  };

  const { minAngle, maxAngle } = ranges[corner];
  const randomAngle = minAngle + Math.random() * (maxAngle - minAngle);
  const radians = (randomAngle * Math.PI) / 180;

  return {
    x: Math.cos(radians),
    y: Math.sin(radians),
  };
};

/**
 * Easing functions for smooth animation transitions
 */
export const easingFunctions = {
  // Linear (no easing) - default
  linear: (t: number): number => t,

  // Ease out quad - subtle deceleration
  easeOutQuad: (t: number): number => t * (2 - t),

  // Ease in out quad - gentle acceleration and deceleration
  easeInOutQuad: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

  // Ease out cubic - more pronounced deceleration
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),

  // Very subtle easing - barely noticeable organic feel
  subtle: (t: number): number => t * t * (3 - 2 * t), // smoothstep
} as const;

export type EasingFunction = keyof typeof easingFunctions;

/**
 * Calculate current translation offset based on elapsed time with optional easing
 */
export const calculateTranslationOffset = (
  vector: { x: number; y: number },
  elapsedTime: number, // milliseconds since animation start
  totalDuration: number, // total animation duration in ms
  easing: EasingFunction = "linear", // default to linear (no easing)
  speedPxPerSec: number = 10, // translation speed in pixels per second
): { x: number; y: number } => {
  const speedPxPerMs = speedPxPerSec / 1000;

  // Calculate progress ratio (0 to 1) capped at 1.0
  const progress = Math.min(elapsedTime / totalDuration, 1.0);

  // Apply easing function to progress
  const easedProgress = easingFunctions[easing](progress);

  // Calculate final distance with easing applied
  const finalDistance = totalDuration * speedPxPerMs;
  const currentDistance = easedProgress * finalDistance;

  return {
    x: vector.x * currentDistance,
    y: vector.y * currentDistance,
  };
};
