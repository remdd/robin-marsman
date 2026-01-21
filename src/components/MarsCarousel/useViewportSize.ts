'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { RESIZE_DEBOUNCE_DURATION } from './config';

interface ViewportSize {
  width: number;
  height: number;
}

interface UseViewportSizeResult {
  viewportSize: ViewportSize;
  isResizing: boolean;
}

/**
 * Custom hook for tracking viewport dimensions with proper SSR handling
 * Returns current viewport width and height, updating on resize events
 * Also exposes isResizing state that is true during resize and for a debounced period after
 */
export const useViewportSize = (): UseViewportSizeResult => {
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

  const [isResizing, setIsResizing] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false);

  const handleResize = useCallback(() => {
    // Don't trigger resize state on initial mount
    if (hasInitializedRef.current) {
      // Immediately set resizing to true
      setIsResizing(true);
    }

    // Update viewport size
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer to clear resizing state
    if (hasInitializedRef.current) {
      debounceTimerRef.current = setTimeout(() => {
        setIsResizing(false);
        debounceTimerRef.current = null;
      }, RESIZE_DEBOUNCE_DURATION);
    }
  }, []);

  useEffect(() => {
    // Set initial size
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Mark as initialized after first render
    hasInitializedRef.current = true;

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener and timer on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [handleResize]);

  return { viewportSize, isResizing };
};