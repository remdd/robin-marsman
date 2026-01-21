'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { calculateTranslationOffset } from './utils';
import type { ImageState } from './types';

/**
 * Custom hook for managing translation animation of images
 * Provides smooth 60fps animation using requestAnimationFrame
 * Optimized for performance with memoization and conditional updates
 * Supports configurable easing functions
 */
export const useTranslationAnimation = (imageState: ImageState) => {
  const animationRef = useRef<number | undefined>(undefined);
  const [currentOffset, setCurrentOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Memoize vector, start time, and easing to prevent unnecessary re-renders
  const { translationVector, animationStartTime, easing } = useMemo(() => ({
    translationVector: imageState.translationVector,
    animationStartTime: imageState.animationStartTime,
    easing: imageState.easing || 'subtle'
  }), [imageState.translationVector, imageState.animationStartTime, imageState.easing]);
  
  useEffect(() => {
    // Safety check for animation properties
    if (!animationStartTime || !translationVector) {
      setCurrentOffset({ x: 0, y: 0 });
      return;
    }
    
    const animate = () => {
      const elapsedTime = performance.now() - animationStartTime;
      const newOffset = calculateTranslationOffset(
        translationVector, 
        elapsedTime, 
        8000, // 8 second total duration
        easing
      );
      
      // Only update state if offset has changed significantly (reduce re-renders)
      const threshold = 0.1; // pixels
      if (
        Math.abs(newOffset.x - lastOffsetRef.current.x) > threshold ||
        Math.abs(newOffset.y - lastOffsetRef.current.y) > threshold
      ) {
        lastOffsetRef.current = newOffset;
        setCurrentOffset(newOffset);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation immediately
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [animationStartTime, translationVector, easing]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, []);
  
  return currentOffset;
};