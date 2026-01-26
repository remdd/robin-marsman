import { useEffect, useState } from 'react';

export type ImageVariant = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveImageConfig {
  variant: ImageVariant;
  breakpoint: number;
}

const IMAGE_VARIANTS: ResponsiveImageConfig[] = [
  { variant: 'mobile', breakpoint: 0 },
  { variant: 'tablet', breakpoint: 768 },
  { variant: 'desktop', breakpoint: 1200 },
];

/**
 * Hook to determine which image variant to use based on viewport size
 */
export function useImageVariant(): ImageVariant {
  const [variant, setVariant] = useState<ImageVariant>('desktop');

  useEffect(() => {
    const updateVariant = () => {
      const width = window.innerWidth;
      
      // Find the largest breakpoint that fits
      let selectedVariant: ImageVariant = 'mobile';
      
      for (const config of IMAGE_VARIANTS) {
        if (width >= config.breakpoint) {
          selectedVariant = config.variant;
        }
      }
      
      setVariant(selectedVariant);
    };

    // Set initial variant
    updateVariant();

    // Listen for resize events
    window.addEventListener('resize', updateVariant);
    
    return () => {
      window.removeEventListener('resize', updateVariant);
    };
  }, []);

  return variant;
}

/**
 * Get the optimized image path for a given image number and variant
 */
export function getOptimizedImagePath(imageNumber: number, variant: ImageVariant): string {
  return `/img/mars/optimized/${variant}/${imageNumber}.webp`;
}

/**
 * Get fallback JPEG path for browsers that don't support WebP
 */
export function getFallbackImagePath(imageNumber: number): string {
  return `/img/mars/${imageNumber}.jpg`;
}

/**
 * Get responsive image config for Next.js Image component
 */
export function getResponsiveImageConfig(imageNumber: number) {
  return {
    webp: {
      mobile: getOptimizedImagePath(imageNumber, 'mobile'),
      tablet: getOptimizedImagePath(imageNumber, 'tablet'),
      desktop: getOptimizedImagePath(imageNumber, 'desktop'),
    },
    fallback: getFallbackImagePath(imageNumber),
  };
}