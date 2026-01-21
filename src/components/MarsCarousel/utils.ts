import type { Rotation, CornerPosition } from './types';

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
  const corners: CornerPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  return corners[Math.floor(Math.random() * corners.length)];
};

/**
 * Calculates the CSS transform values for positioning a rotated image
 * Simple approach: position the image center at each corner, then let overflow handle the rest
 */
export const getCornerTransform = (corner: CornerPosition, rotation: Rotation): string => {
  // Simple positioning: place image so it originates from the specified corner
  switch (corner) {
    case 'top-left':
      return 'translate(0px, 0px)';
    case 'top-right':
      return 'translate(-1920px, 0px)';
    case 'bottom-left':
      return 'translate(0px, -1920px)';
    case 'bottom-right':
      return 'translate(-1920px, -1920px)';
    default:
      return 'translate(0px, 0px)';
  }
};

/**
 * Creates a complete CSS transform string combining rotation and position
 */
export const getCombinedTransform = (rotation: Rotation, position: CornerPosition): string => {
  const positionTransform = getCornerTransform(position, rotation);
  return `rotate(${rotation}deg) ${positionTransform}`;
};

/**
 * Gets the next image index in a circular array
 */
export const getNextImageIndex = (currentIndex: number, totalImages: number): number => {
  return (currentIndex + 1) % totalImages;
};

/**
 * Calculates the required scale factor to ensure minimum 50% viewport overflow
 * Only scales up - never scales down from base size
 */
export const calculateRequiredScale = (
  viewportWidth: number,
  viewportHeight: number,
  baseImageSize: number = 1920
): number => {
  // Safety checks for invalid inputs
  if (!viewportWidth || !viewportHeight || viewportWidth <= 0 || viewportHeight <= 0) {
    console.warn('Invalid viewport dimensions:', { viewportWidth, viewportHeight });
    return 1;
  }

  // Calculate current overflow with base image size
  const currentOverflowX = baseImageSize - viewportWidth;
  const currentOverflowY = baseImageSize - viewportHeight;
  
  // Required overflow is 50% of viewport dimensions
  const requiredOverflowX = viewportWidth * 0.5;
  const requiredOverflowY = viewportHeight * 0.5;
  
  // Only scale up if current overflow is insufficient
  const scaleNeededForX = currentOverflowX < requiredOverflowX ? 
    (viewportWidth + requiredOverflowX) / baseImageSize : 1;
  const scaleNeededForY = currentOverflowY < requiredOverflowY ? 
    (viewportHeight + requiredOverflowY) / baseImageSize : 1;
  
  // Use the larger scale requirement to satisfy both axes
  const requiredScale = Math.max(1, scaleNeededForX, scaleNeededForY);
  
  // Safety check for invalid scale factors
  if (!isFinite(requiredScale) || requiredScale <= 0) {
    console.warn('Invalid scale factor calculated:', { requiredScale, viewportWidth, viewportHeight });
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
    'top-left': 'top left',
    'top-right': 'top right',
    'bottom-left': 'bottom left',
    'bottom-right': 'bottom right'
  };
  return origins[corner];
};

/**
 * Calculates the scaled image dimensions
 */
export const getScaledDimensions = (
  baseSize: number,
  scaleFactor: number
): { width: number; height: number } => {
  const scaledSize = Math.round(baseSize * scaleFactor);
  return {
    width: scaledSize,
    height: scaledSize
  };
};