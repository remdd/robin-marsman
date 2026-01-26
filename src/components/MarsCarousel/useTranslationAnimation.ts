"use client";

import { useState, useEffect, useRef } from "react";
import { calculateTranslationOffset } from "./utils";
import {
  TOTAL_CYCLE_DURATION,
  DEFAULT_TRANSLATION_EASING,
  TRANSLATION_SPEED_PX_PER_SEC,
} from "./config";
import { useReducedMotion } from "../../hooks";
import type { ImageState } from "./types";

/**
 * Custom hook for managing translation animation of images
 * Provides smooth 60fps animation using requestAnimationFrame
 * Calculates offset synchronously on each render to prevent flickers
 * Respects user's reduced motion preference
 */
export const useTranslationAnimation = (imageState: ImageState) => {
  const animationRef = useRef<number | undefined>(undefined);
  const [tick, setTick] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Extract primitive values to use as stable dependencies
  const vectorX = imageState.translationVector?.x ?? 0;
  const vectorY = imageState.translationVector?.y ?? 0;
  const animationStartTime = imageState.animationStartTime;
  const easing = imageState.easing || DEFAULT_TRANSLATION_EASING;

  // Calculate offset synchronously on every render - this ensures we never
  // return {0,0} when we should have a non-zero offset
  // For reduced motion users, always return {0,0} to disable translation
  const currentOffset = (() => {
    if (prefersReducedMotion) {
      return { x: 0, y: 0 };
    }

    if (!animationStartTime) {
      return { x: 0, y: 0 };
    }
    const translationVector = { x: vectorX, y: vectorY };
    const elapsedTime = performance.now() - animationStartTime;
    return calculateTranslationOffset(
      translationVector,
      elapsedTime,
      TOTAL_CYCLE_DURATION,
      easing,
      TRANSLATION_SPEED_PX_PER_SEC
    );
  })();

  useEffect(() => {
    // Safety check for animation properties and reduced motion preference
    if (!animationStartTime || prefersReducedMotion) {
      return;
    }

    const animate = () => {
      // Trigger a re-render by updating tick, which will recalculate currentOffset
      setTick((t) => t + 1);
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
  }, [animationStartTime, vectorX, vectorY, easing, prefersReducedMotion]);

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
