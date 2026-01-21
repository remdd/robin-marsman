'use client';

import { useState, useEffect } from 'react';

interface ViewportSize {
  width: number;
  height: number;
}

/**
 * Custom hook for tracking viewport dimensions with proper SSR handling
 * Returns current viewport width and height, updating on resize events
 */
export const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>(() => {
    // Initial SSR-safe values - will be updated on client
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return {
      width: 1920, // Default fallback for SSR
      height: 1080,
    };
  });

  useEffect(() => {
    // Update with actual viewport size on client hydration
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    updateViewportSize();

    // Add resize listener
    window.addEventListener('resize', updateViewportSize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', updateViewportSize);
    };
  }, []);

  return viewportSize;
};