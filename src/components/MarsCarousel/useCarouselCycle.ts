'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CarouselState, CarouselConfig, ImageState } from './types';
import { getRandomRotation, getRandomCorner, getNextImageIndex, calculateRequiredScale, getRandomTranslationVector } from './utils';
import { useViewportSize } from './useViewportSize';

/**
 * Custom hook for managing Mars carousel timing and state transitions
 */
export const useCarouselCycle = (config: CarouselConfig) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const viewportSize = useViewportSize();
  
  const [state, setState] = useState<CarouselState>(() => {
    // Initialize with a static state to prevent hydration mismatch
    const initialImage: ImageState = {
      src: config.images[0],
      rotation: 0, // Start with static values
      position: 'top-left',
      opacity: 1,
      scaleFactor: 1, // Default scale factor
      translationVector: { x: 0, y: 0 }, // No movement initially
      animationStartTime: 0, // Will be set after hydration
    };

    return {
      currentImage: initialImage,
      nextImage: initialImage,
      phase: 'displaying',
      imageIndex: 0,
    };
  });

  /**
   * Calculate scale factor based on current viewport size
   */
  const getScaleFactorForViewport = useCallback((): number => {
    return calculateRequiredScale(viewportSize.width, viewportSize.height);
  }, [viewportSize.width, viewportSize.height]);

  /**
   * Initialize with random values after hydration
   */
  useEffect(() => {
    const scaleFactor = getScaleFactorForViewport();
    const position = getRandomCorner();
    const translationVector = getRandomTranslationVector(position);
    
    const initialImage: ImageState = {
      src: config.images[0],
      rotation: getRandomRotation(),
      position,
      opacity: 0, // Start with opacity 0 for fade-in effect
      scaleFactor,
      translationVector,
      animationStartTime: performance.now(),
    };

    setState({
      currentImage: initialImage,
      nextImage: initialImage,
      phase: 'displaying',
      imageIndex: 0,
    });

    setIsInitialized(true);
  }, [config.images, getScaleFactorForViewport]);

  /**
   * Fade in the first image after initialization
   */
  useEffect(() => {
    if (!isInitialized) return;
    
    // Small delay to ensure DOM is ready, then fade in the first image
    const fadeInTimer = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        currentImage: prevState.currentImage ? {
          ...prevState.currentImage,
          opacity: 1,
        } : null,
      }));
    }, 100); // 100ms delay for smooth initialization

    return () => clearTimeout(fadeInTimer);
  }, [isInitialized]);

  /**
   * Update scale factor when viewport size changes
   */
  useEffect(() => {
    if (!isInitialized) return;
    
    const newScaleFactor = getScaleFactorForViewport();
    
    setState(prevState => ({
      ...prevState,
      currentImage: prevState.currentImage ? {
        ...prevState.currentImage,
        scaleFactor: newScaleFactor,
      } : null,
      nextImage: {
        ...prevState.nextImage,
        scaleFactor: newScaleFactor,
      },
    }));
  }, [viewportSize.width, viewportSize.height, isInitialized, getScaleFactorForViewport]);

  /**
   * Creates a new random image state for the next image
   */
  const createNextImageState = useCallback((imageIndex: number): ImageState => {
    const scaleFactor = getScaleFactorForViewport();
    const position = getRandomCorner();
    const translationVector = getRandomTranslationVector(position);
    
    return {
      src: config.images[imageIndex],
      rotation: getRandomRotation(),
      position,
      opacity: 0,
      scaleFactor,
      translationVector,
      animationStartTime: performance.now(), // Start animation immediately
    };
  }, [config.images, getScaleFactorForViewport]);

  /**
   * Advances to the next phase in the carousel cycle
   */
  const advancePhase = useCallback(() => {
    setState(prevState => {
      switch (prevState.phase) {
        case 'displaying': {
          // Start fade-out phase
          return {
            ...prevState,
            phase: 'fading-out',
            currentImage: prevState.currentImage ? {
              ...prevState.currentImage,
              opacity: 0,
            } : null,
          };
        }
        
        case 'fading-out': {
          // Start fade-in phase with next image (opacity starts at 0)
          const nextIndex = getNextImageIndex(prevState.imageIndex, config.images.length);
          const nextImage = createNextImageState(nextIndex);
          
          return {
            ...prevState,
            phase: 'fading-in',
            currentImage: null,
            nextImage: nextImage, // Keep opacity at 0 initially
            imageIndex: nextIndex,
          };
        }
        
        case 'fading-in': {
          // Complete transition to displaying phase
          return {
            ...prevState,
            phase: 'displaying',
            currentImage: {
              ...prevState.nextImage,
              opacity: 1, // Ensure full opacity for display phase
            },
            nextImage: prevState.nextImage,
          };
        }
        
        default:
          return prevState;
      }
    });
  }, [config.images.length, createNextImageState]);

  /**
   * Trigger fade-in opacity change after DOM update
   */
  useEffect(() => {
    if (state.phase === 'fading-in') {
      // Use requestAnimationFrame to ensure DOM is updated before changing opacity
      requestAnimationFrame(() => {
        setState(prevState => ({
          ...prevState,
          nextImage: {
            ...prevState.nextImage,
            opacity: 1,
          },
        }));
      });
    }
  }, [state.phase]);

  /**
   * Set up timing intervals for each phase (only after initialization)
   */
  useEffect(() => {
    if (!isInitialized) return;

    let timeoutId: NodeJS.Timeout;

    const scheduleNextPhase = () => {
      let delay: number;
      
      switch (state.phase) {
        case 'displaying':
          delay = config.displayDuration;
          break;
        case 'fading-out':
          delay = config.fadeOutDuration;
          break;
        case 'fading-in':
          delay = config.fadeInDuration;
          break;
        default:
          delay = config.displayDuration;
      }

      timeoutId = setTimeout(() => {
        advancePhase();
      }, delay);
    };

    scheduleNextPhase();

    // Cleanup timeout on unmount or state change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [state.phase, advancePhase, config, isInitialized]);

  return {
    currentImage: state.currentImage,
    nextImage: state.nextImage,
    phase: state.phase,
  };
};