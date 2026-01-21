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