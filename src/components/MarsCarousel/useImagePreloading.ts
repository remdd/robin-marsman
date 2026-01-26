import { useEffect } from 'react';
import { getAssetPath } from '@/utils/paths';
import { getOptimizedImagePath, type ImageVariant } from './useResponsiveImages';

/**
 * Hook to preload carousel images for better performance
 */
export function useImagePreloading(
  currentImageIndex: number,
  totalImages: number,
  variant: ImageVariant,
  isVisible: boolean = true
) {
  useEffect(() => {
    if (!isVisible) return;

    // Preload current and next 2 images
    const imagesToPreload = [
      currentImageIndex,
      (currentImageIndex + 1) % totalImages,
      (currentImageIndex + 2) % totalImages,
    ];

    const preloadPromises = imagesToPreload.map((index) => {
      const imageNumber = index + 1; // Convert 0-based index to 1-based
      const imagePath = getOptimizedImagePath(imageNumber, variant);
      const fullPath = getAssetPath(imagePath);

      // Create a new image element to trigger browser preload
      const img = new Image();
      img.src = fullPath;
      
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't fail on error, just continue
      });
    });

    // Don't await - let preloading happen in background
    Promise.all(preloadPromises).catch(() => {
      // Silently handle preload failures
    });

  }, [currentImageIndex, totalImages, variant, isVisible]);
}